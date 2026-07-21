import { supabase } from '../supabaseClient';

const RESUME_BUCKET = 'applicant-resumes';
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Map([
  ['application/pdf', 'pdf'],
  ['application/msword', 'doc'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx']
]);

const validateApplicationFile = (file) => {
  if (!(file instanceof File)) throw new Error('A valid file is required.');
  if (file.size <= 0 || file.size > MAX_FILE_SIZE) throw new Error('File must be between 1 byte and 3MB.');

  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || ALLOWED_FILE_TYPES.get(file.type) !== extension) {
    throw new Error('Only PDF, DOC, and DOCX files are accepted.');
  }
  return extension;
};

const uploadApplicationFile = async (file) => {
  const fileExt = validateApplicationFile(file);
  const cleanFileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage.from(RESUME_BUCKET).upload(cleanFileName, file, {
    cacheControl: '0',
    contentType: file.type,
    upsert: false
  });
  if (error) throw error;

  return cleanFileName;
};

// Submits a job application: uploads resume (required) and cover letter
// (optional) to private storage, then inserts the application record.
export const submitApplication = async ({ role, fullName, email, phone, message, resumeFile }) => {
  const resumePath = await uploadApplicationFile(resumeFile);
  try {
    const { error } = await supabase.from('job_applications').insert({
      job_id: String(role.id).slice(0, 150),
      job_title: String(role.title).slice(0, 200),
      full_name: fullName.trim().slice(0, 150),
      email: email.trim().toLowerCase().slice(0, 320),
      phone: phone.trim().slice(0, 40) || null,
      message: message.trim().slice(0, 3000) || null,
      resume_path: resumePath,
      resume_filename: resumeFile.name.slice(0, 255)
    });

    if (error) throw error;
  } catch (error) {
    // Avoid leaving an orphaned private file when the database insert fails.
    await supabase.storage.from(RESUME_BUCKET).remove([resumePath]);
    throw error;
  }
};
