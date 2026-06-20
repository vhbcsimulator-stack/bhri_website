-- ============================================================================
-- Supabase PostgreSQL Database Schema
-- Project: Bright Hermosa Realty Inc. (BHRI)
-- Description: Table schemas, RLS Policies, Storage Buckets, and Admin Setup
-- ============================================================================

-- 1. Enable Required Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================================
-- 2. PROPERTIES TABLE SCHEMA
-- ============================================================================
drop table if exists public.properties cascade;

create table public.properties (
  id text primary key, -- e.g. 'east-west-breeze', 'mountain-view'
  title text not null,
  subtitle text,
  hero_image text,
  location text,
  location_full text,
  badge_location text,
  badge_status text,
  type text check (type in ('farm', 'resort')),
  type_full text,
  card_image text,
  description text,
  icon_name text,
  highlight_text text,
  intro jsonb not null,
  facilities jsonb not null,
  developments jsonb not null,
  investment jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

comment on table public.properties is 'Stores all luxury community and farm resort properties.';

-- ============================================================================
-- 3. ROW-LEVEL SECURITY (RLS) FOR PROPERTIES TABLE
-- ============================================================================
alter table public.properties enable row level security;

-- Policy A: Allow anyone (public and anonymous) to view properties
create policy "Allow public read access" on public.properties
  for select
  using (true);

-- Policy B: Allow authenticated administrators to perform all database write operations
create policy "Allow admin write access" on public.properties
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================================
-- 4. SUPABASE STORAGE BUCKET CONFIGURATION
-- ============================================================================
-- Register the public 'properties-media' bucket inside storage.buckets schema
do $$
begin
  if not exists (select 1 from storage.buckets where id = 'properties-media') then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'properties-media', 
      'properties-media', 
      true, 
      1572864, -- 1.5MB file limit to prevent storage overflow
      array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    );
  end if;
end $$;

-- RLS Policies for Storage Objects (Files upload/download/management)
-- Policy A: Allow anyone to read files inside the public 'properties-media' bucket
create policy "Allow public read from bucket" on storage.objects
  for select
  using (bucket_id = 'properties-media');

-- Policy B: Allow authenticated users (Admin) to upload files
create policy "Allow admin insert into bucket" on storage.objects
  for insert
  with check (bucket_id = 'properties-media' and auth.role() = 'authenticated');

-- Policy C: Allow authenticated users (Admin) to update files
create policy "Allow admin update in bucket" on storage.objects
  for update
  using (bucket_id = 'properties-media' and auth.role() = 'authenticated');

-- Policy D: Allow authenticated users (Admin) to delete files
create policy "Allow admin delete in bucket" on storage.objects
  for delete
  using (bucket_id = 'properties-media' and auth.role() = 'authenticated');

-- ============================================================================
-- 5. ADMIN USER CREATION SCRIPT
-- ============================================================================
-- Inserts the admin user into Supabase's auth.users table
-- Username: admin | Email: admin@bhri.com | Password: BHRI@2026
-- Note: Uses bcrypt (BF) crypt encryption to safely seed the password hash.
do $$
begin
  if not exists (select 1 from auth.users where email = 'admin@bhri.com') then
    insert into auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) 
    values (
      '00000000-0000-0000-0000-000000000000',
      uuid_generate_v4(),
      'authenticated',
      'authenticated',
      'admin@bhri.com', -- email address used to log into Supabase
      crypt('BHRI@2026', gen_salt('bf', 10)), -- Hashes with bcrypt cost factor 10
      now(),
      null,
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"username":"admin"}', -- Username meta tag
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  end if;
end $$;

-- ============================================================================
-- 6. DATA PRE-POPULATION (INITIAL PROPERTY TEMPLATES)
-- ============================================================================
delete from public.properties where id = 'east-west-breeze';

insert into public.properties (
  id, title, subtitle, hero_image, location, location_full, badge_location, badge_status, type, type_full, card_image, description, icon_name, highlight_text, intro, facilities, developments, investment
) values (
  'east-west-breeze',
  'East West Breeze Leisure Farm & Resort',
  'Sustainable Luxury in the Heart of Indang, Cavite. A retreat where heritage meets the future of organic living.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDfZvQAtEyr1ePCl2ajfrR_f87QZmBrrYybGTidMEsHFjniWLZJsbXGqoJkrlnB_F8nG-F29hi680fZW8yjRvL1k_6vkwdY8N7dOGkAO_vxrJEY80-VDiYqol1Zq9Wmf4PF8z9PkiWxhLlugRcU7Jxg_ggDMu97358B9G_5Er2kJIOsZ2bLHNdZfvRmoIWq7qEczmzrN5o5yV6dtLxVUYfqrOEuo2irJznCnuQTYmx3Nns08lvc8e23P-QcyB1wsLJW3rvzpseNbnE',
  'Cavite',
  'Indang, Cavite',
  'INDANG CAVITE',
  'PRE-SELLING',
  'farm',
  'Leisure Farm Lot',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJHgEBLDZpW51YnAo_ojFVQTDFd04zPCEbnHHaldmsXuTVdw26qXlTI5sy0nCsEXAjcTxiWIjEGUmgWM0AtfyuGFSZiTNGNyFFTWZBlwK_d_vj8x5fjHqIN2OKs8CVxyq-Jhrnbsn7K5Y018riiBZLGmN91RJBSSEg6dMrJeaz7vjdymareZbO1dmKc1aygYq2LhfdoA19nHg5uXI0w5kszq4g2y8RP8JNAfOJUHT0D2p5SPll0YG4UaVR5SSYPbfJ8yl0HNWXudI',
  'The newest leisure farm community in the tranquil plains of Indang, Cavite within the East-West Road, providing a close proximity to Tagaytay City and Batangas province. Enjoy backyard gardening and sustainable access to fresh, organic produce in a resort-like setting.',
  'nature',
  'Residential Farm Lots',
  $${
    "tag": "Premier Leisure Estate",
    "title": "Where Organic Harmony Meets Modern Living",
    "text": [
      "East West Breeze Leisure Farm and Resort is the newest leisure farm community in the tranquil plains of Indang, Cavite. Situated along the East-West Road, it provides strategic proximity to the cool climate of Tagaytay City and the pristine beaches of Batangas.",
      "\"Back to Basics\" is more than a slogan here—it's a philosophy of life.",
      "Our development champions sustainable and luxurious living, offering farm lots nestled within green pastures. Experience unique amenities never before seen in Cavite, designed to foster organic farming and holistic wellness for every resident."
    ],
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA3xZQBV1b0-_MHfJ_i1ps032XQiMvv1Nahu4Uc0wmJWCi9YSoI9Z6WLy_3EklKZ_JwAAcngdauqZBOWIdKB8qoJuaJiCL6yXEnYYhFL0Uvb6pXlBewezPvAWdgoevFWfH27Ym3NEUdY18_5spaXPSx9kOs98RtENUw1DcwHC4xdHK9_qGW9CaEYjCe7mkMKyewHkbmulWkQarxTwo7cnL1sqZ1NEcZP-6oTudBiDAlhbg-WVDydp63cj0z1ZeZfhuu27IwOfNF710",
    "stats": [
      { "value": "15 min", "label": "Drive to Tagaytay" },
      { "value": "Organic", "label": "Farm-to-Table Focus" }
    ]
  }$$,
  $${
    "title": "World-Class Leisure Facilities",
    "subtitle": "We strive to bring the comfort and extravagance of modern amenities to rural communities, enhancing the quality of life through nature-integrated design.",
    "style": "bento-ewb",
    "items": [
      {
        "id": "clubhouse",
        "title": "Modern Clubhouse",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAjIv9rUWwuBCdm1j_9MO32S3LcSoEixAsCBeKcPVf2cQvly3KZrdfjhCGkdkplnK025HwbHfE6h7X5meUotlDU7KndHNF-OmsRCm8LEI_oM4D3cid0x652qsPxSI_KgRVZwLCCYhn6zNywMoDBJq49bPnYGsXPQL1LW8hRJ5i7J2de9DStJBnsFFKxd_mq4s3hTHz4mDBiS1vFiharXHjUCQdA4L-kw_cV7ORUqJMzjbqBxvz6szz8iEITEJ3IVEEXXIRyFA9H8xk"
      },
      {
        "id": "pools",
        "title": "Swimming Pools",
        "image": "https://lh3.googleusercontent.com/aida/AP1WRLuT_DVBPXfG5XHC6a5-6qUKT0gGcpLXRLutI7IWf3-jxojcO9RkdHCp_j9JRwJGMemWddqPsVa2dhwHI5FNncltUWrX4t9t8psmPgBbJIPlIy1lpwIVI-bCvbjUD147hALS4jZOi4AdZV2NHoR-Ig-KAD0p2eXp7bCns4iIsxAo7lGQwtcKbw3cTx5TXZ0xm7Z8TCMD4_E-DT6g-Aft6EQctHbJrSSWQNNDd5ky5yxhOnetPcwZ7z4wpsQ"
      },
      {
        "id": "farms",
        "title": "Organic Farms",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD4YFIg_2hAlgPyCoAQGDlZW4JJo9M6y8Q-2VEcfZM-5yxidUsrEw7zcaUSmd1RaciW5PXyllL5DDnf8VxjYgesDIycTOKnyBFShziLcgTASXXKBqvdVvP3JVBvlLOw-F3PNu9BDm-PIJjK_XN9LT-mUDA4XUxWP9_Zz4RdQwZEaGVelYG5OxXKDfhaSwhsFPQlJ9YkzepjwWySI2TBUqgM-wRE8Qjr09xvHsMErvCMYGUi6qgogZdotvehB8ss6XeRvOrwRt1fXOY"
      },
      {
        "id": "wellness",
        "title": "Wellness Spaces",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBBV9vI9Lcb8HcUtKINxr0pNPyagLYFTpcfCm_5WRl0VY6oquT1A47aWq-tq0aHeuOnXskYDCu73v1UP1scL3xB0gYSO8NgmZdy_VT1oJ0Yc9QafMvalSdcOA5pizAUloyO06zqdonMEzf9Pp-hk4UdH8exawtjrMNm9BJLBkLc8jW9gRB2KrQnLTDzeS3NlK4RWCZuMJcSwPvuHw77A_viSR9ad8w52FKmDFLd5hez_q4JGqBm8zevTIJ5rCglJxOlnUwUFym8zBI"
      },
      {
        "id": "parks",
        "title": "Lush Parks",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuAlMORU-0xZb2INO2g9_Nfbqvidjpi-HWfGD-nkVdY5ManGU4CDtJR3LNfNyybYabx_pMhE2oWC9v_wmxGE6WyEqCk6CR_HJ0_vQEjPSDj4ZPTIkvTzanqCZn1LV1LQ4xaV2MjgCTEYXdTEdJ9OwR-6ZJDfFQklQeEoB6bwlmHycPXe0T6YEZtZ8Qe64gac90gIPVR3b41LZfx4Q_6KqiVtEpAi_wJoOwyRf5bUQF7n39XiB3jaNthb4aIVSx87pOthmFbGuaLp0Lw"
      }
    ]
  }$$,
  $${
    "title": "Project Developments",
    "subtitle": "Witness the transformation of East West Breeze. Our team is working diligently to bring this sustainable sanctuary to life, ensuring every detail meets our high standards of luxury and harmony.",
    "style": "bento-ewb",
    "items": [
      {
        "id": "gatehouse",
        "title": "Main Gatehouse Construction",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCxk7O-y3X-hdQRWoAVAKEj1_MqJ907Hk8Kz-aWRnANDq4AWq-8msOjy_wNiQdEzhd3T3q-IskGCDA8ZuiNQSy4u7k2-OUwMf_1RBvYz1Kxxvac8gV41_4PRX4omxS6Cw3mYaexUWw1-lGJxGN6VPE0qYM4IlS9RMShG_8YPQk3b4eQTucKDO4OnQq7z47Sm4S9uUzLHYEoVhQPucUef4SSddsS0n3Bg1OIJByf4ew4ZnFU0QQ9ZQLdgZ1fzuK8Mn6d-O5g-YjTtPg"
      },
      {
        "id": "landscaping",
        "title": "Community Entrance Landscaping",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCwzjFUoDdF4UAedFYCe5TRZ6_IuujTpSEjXVdrShktKJ5QLcjpUAtetsoUIgwU8tQKOLXT6euApZrVSxdUr6BieYz8rJqt9Ghh1gEvDavBLHtyQ_AICyv-JsDT9f3rDplKJVdAgsST5wMfY6bkARCJU53GElQn1jv1oKPjvY3ibXTIGQImygYQpKKQDA6LIK8cdx49_Wxx0VBzmfxNLgfrGdLs06PHLBH3_jVBU1FfbTzPFN-upU4rjNoz3TIrdS0zQ9n6q_R6CvY"
      },
      {
        "id": "infrastructure",
        "title": "Sustainable Water Features",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCaEA3K91iW7qlYWskAWlOGm8K0mc9ZQaVbMO7cIXxyVavqcbrfbOYafSknwrioK9fyOf0czv1htuJ5z4d4ZuAX6T2fMs-QD_tjMnRxU3h7XkzlxfwF_aj_YUbuamHDFPybe-hS3nrBllLiKK-f473tNciCDt4AtEgd40UHunnrWAz29TVa9Kps-JxxGL2jF3yRi_ErmSrjnjofMlSa4v9jGn4ZAuY31LlZ8vBFHQ90I7Fx189YbI5vRlkF4RMyp1Cm6dZ1CZSDeBM"
      },
      {
        "id": "farms",
        "title": "Organic Farm Areas",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuD4YFIg_2hAlgPyCoAQGDlZW4JJo9M6y8Q-2VEcfZM-5yxidUsrEw7zcaUSmd1RaciW5PXyllL5DDnf8VxjYgesDIycTOKnyBFShziLcgTASXXKBqvdVvP3JVBvlLOw-F3PNu9BDm-PIJjK_XN9LT-mUDA4XUxWP9_Zz4RdQwZEaGVelYG5OxXKDfhaSwhsFPQlJ9YkzepjwWySI2TBUqgM-wRE8Qjr09xvHsMErvCMYGUi6qgogZdotvehB8ss6XeRvOrwRt1fXOY"
      },
      {
        "id": "wellness",
        "title": "Wellness Areas Development",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBBV9vI9Lcb8HcUtKINxr0pNPyagLYFTpcfCm_5WRl0VY6oquT1A47aWq-tq0aHeuOnXskYDCu73v1UP1scL3xB0gYSO8NgmZdy_VT1oJ0Yc9QafMvalSdcOA5pizAUloyO06zqdonMEzf9Pp-hk4UdH8exawtjrMNm9BJLBkLc8jW9gRB2KrQnLTDzeS3NlK4RWCZuMJcSwPvuHw77A_viSR9ad8w52FKmDFLd5hez_q4JGqBm8zevTIJ5rCglJxOlnUwUFym8zBI"
      }
    ]
  }$$,
  $${
    "title": "The Smart Choice for Future Generations",
    "style": "bento-ewb-inv",
    "items": [
      {
        "type": "large",
        "title": "Capital Appreciation",
        "description": "Investing in leisure farms like East West Breeze presents a unique opportunity. The rise in demand for rural properties that offer both lifestyle and investment potential makes this community an attractive option for portfolio diversification.",
        "icon": "trending_up",
        "bgClass": "bg-primary text-on-primary",
        "bgDecoration": "finance_chip"
      },
      {
        "type": "small-text",
        "title": "Personal Fulfillment",
        "description": "Rediscover the joy of planting your own food and living away from the city's noise. It's an investment in your peace of mind.",
        "bgClass": "bg-tertiary text-on-tertiary"
      },
      {
        "type": "small-icon",
        "title": "Secure Legacy",
        "description": "A generational asset that only gets more valuable with time.",
        "icon": "shield_lock",
        "bgClass": "bg-surface-container-high text-primary"
      },
      {
        "type": "medium-text",
        "title": "Expanding Tourism Hub",
        "description": "Located in the rapid-growth corridor of Cavite, East West Breeze is perfectly positioned to benefit from major infrastructure developments and the booming local tourism sector.",
        "icon": "home_work",
        "bgClass": "bg-secondary-container text-on-secondary-container"
      }
    ]
  }$$
);

delete from public.properties where id = 'mountain-view';

insert into public.properties (
  id, title, subtitle, hero_image, location, location_full, badge_location, badge_status, type, type_full, card_image, description, icon_name, highlight_text, intro, facilities, developments, investment
) values (
  'mountain-view',
  'Mountain View Leisure Community',
  'Sustainable Luxury in Munting Indang, Nasugbu, Batangas. Experience a life synchronized with nature''s warm embrace.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYIzXNL0I0CC9R96cf-qKacfjTTxiy83hD_WAzdulDrG-4EUDHyKMHK02rlVw1EkzHoxN-Cdiu17cmlDypvf9OxGVSS06_cFjPWD6FVjFxKTIwlFrJdaqkmt3_nMiqWz4izKvPacItjxZSiFhicfHyM8K9wgYfH4pNgLY0Gdr4pASgEIOkcJyIvOnpD-3qzVUY9ItE6440PnQ-8YAgV6BZxJYtJdb798CBr5jNEopdNsO_4rnvZ8ByCx2BH-n4Z1uklCeSOQ_izFs',
  'Batangas',
  'Nasugbu, Batangas',
  'NASUGBU BATANGAS',
  'PRE-SELLING',
  'resort',
  'Resort Estate',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDr0vEiZIAUCuUPP2o_iwBq0MpqyR09AiamTRQ_78p-sinlRmxelYE300ZRDpJJGNpi2QUi89Z0Ug1nbQ_fgSprnvqBWpQBjUUnZFvVj8JOdHUTYLpmhitXlALv2BDf5_eXRu-uEw07r8cNdcvcZ8LyhmhxzMoidQVe5rinpbd9CAn0vE9AbJxVcr6gv_e6zyfzFeKlNDsFh1pbqbWaaVXdtqewDHAEnBTcom8WUPILF7KW_GWPDXNNzRcMpJO5f9pBfwgFkwfO898',
  'Situated at the foothills of Nasugbu''s mountains, this 30-hectare pre-selling leisure community is located in Munting Indang, Nasugbu, Batangas. It paves the way for sustainable tourism, aiming to give future lot owners a luxurious lifestyle within nature''s warm embrace.',
  'landscape',
  'Residential and Commercial',
  $${
    "tag": "The Sanctuary",
    "title": "A Sanctuary Within Nature's Embrace",
    "text": [
      "Situated at the foothills of Nasugbu's mountains, Mountain View Leisure Community is a 30-hectare pre-selling leisure community located in Munting Indang, Nasugbu, Batangas.",
      "This new leisure community aims to give future lot owners a luxurious lifestyle within nature's warm embrace. By choosing this location, you secure a property that benefits from the scenic views, cooler breezes, and pristine environment of Nasugbu."
    ],
    "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuCsBUK6FRfbIt94FkWTZ--rFCcfNlJIbBYRS5aI33ftiQrCMKRR6SE8xmppEGxbI1iM4aY0ThYpIDxmCyO3Twwg92jYidjJAkBkicIFe3ubY7njyscqwyAlVThPn2vwMkpHqCpA1z7iL5EjKoaCmCHuMNpVYW9zSqGokRUVKBZZcWh0JVaLZEE2qYMGZm7V7ffUr4ARiRU4TkbT8MdbXiXBSBJMGlpEd9R3ncaQ6pgNEBAAQ1lfAQtUy0gs38iV6-i4Ytx0VtG7j24",
    "stats": [
      { "value": "30 Hectares", "label": "Lush Estate" },
      { "value": "Batangas", "label": "Foothills Location" }
    ]
  }$$,
  $${
    "title": "World-Class Leisure Facilities",
    "subtitle": "Designed to harmonize with the environment, our amenities offer a perfect blend of luxury and nature for a refined rural living experience.",
    "style": "bento-mv",
    "items": [
      {
        "id": "pools",
        "title": "Swimming Pools",
        "description": "Experience tranquility in our infinity-edge pools that merge seamlessly with the mountain horizon.",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBj0jGvF8s0KzxEQKLfaFL7U-0sRFDkm6RW8C3P8nDQ10dnECBxCbB6eCgfrf3VnIU8tHwDeOb9Kb6njIKM48xvDUrUbmTy_S1Fss-VyHzBRAYMHKXC5w7WWTTX660kuEWCLUk0U18csQU9l3DKHwSMFCY72_166OXph9syNp8px5hDSy1kB-CtfiwBe-7BULCjaT7Lm1Vs1MC2H3hi8fKBCXnPDTi-JcXrlXSRNcmCIfr22xbnAIInK4TEtYeMY6I8sxV3LFs2M3w"
      },
      {
        "id": "fitness",
        "title": "Fitness Center",
        "icon": "exercise",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBox4_-ayo1yQ3IhYKqqP1h8O3ZbPP3u7J2Xmlo1nJksz8kxUUQFa3xTc6YsH7F_FZ8rBMTSt_XDuSn6z9lDYIUJn4vXuc2379c3qoEcRrR_tYDm4M83NobuTJDCJNoyotRnbm2EYigOIu0oLeZUSw8PkEaiEssbs9PW5gtNKyK4MAzBQixv7KiwEc_ikW4maw1YlFlDhePlsFz7HXeTHP79Bz3_xM72oDXkjzF3pUkimEAIcEnB8zaSWVJrx33rlliqjrgZJVrrX4"
      },
      {
        "id": "gardens",
        "title": "Lush Gardens",
        "icon": "nature",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuBCxLgtHTU20vykXctR9zDMPE7UNPUDGEAMaOlMU1ouF6Rq3PrFEizkX7B7BMlnIuAlJ_V8Eb84ltDVdNVZS10FRIZLycGPexeLYTqtjGH4zuzqZ3y6Oa6SUYeir0ktJHw0QskjcsNzYWJGoyCcI65PHcCs-wH-FuLitm7UBUewGb5RJHP75WDHP__W3XvGVIPK1tsgM0wOBRpCZBT97srUZcnTvys79PfqccVtgCxDooWxEeIJ9Mmq-Ar8PLFBJsfkgvVTzSlzCDQ"
      },
      {
        "id": "concierge",
        "title": "Concierge & Nature Trails",
        "description": "Expert staff to guide your journey through kilometers of curated scenic trails.",
        "image": "https://lh3.googleusercontent.com/aida/AP1WRLuT_DVBPXfG5XHC6a5-6qUKT0gGcpLXRLutI7IWf3-jxojcO9RkdHCp_j9JRwJGMemWddqPsVa2dhwHI5FNncltUWrX4t9t8psmPgBbJIPlIy1lpwIVI-bCvbjUD147hALS4jZOi4AdZV2NHoR-Ig-KAD0p2eXp7bCns4iIsxAo7lGQwtcKbw3cTx5TXZ0xm7Z8TCMD4_E-DT6g-Aft6EQctHbJrSSWQNNDd5ky5yxhOnetPcwZ7z4wpsQ"
      }
    ]
  }$$,
  $${
    "title": "Project Developments",
    "subtitle": "Witness the transformation of Munting Indang into a premier sustainable haven. Our construction milestones reflect our commitment to excellence.",
    "style": "bento-mv",
    "items": [
      {
        "id": "gatehouse",
        "title": "Main Gatehouse Construction",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuA3KuPbkNrJx8yGYclObYJMh-yVnJvbxt9eECOmSjxOF06NSIA-E3Ugw9iXpp1grPKUBEtWTdr4apQhtWd2I9pM6OMNbtbGQlVB9AnLnZRgXKC9aSvQ33UyJg1iTNycqm6u6reuwVDQqwlcc4hOtQH8QsvDEEz2VXU510iBtwBEsC_JUQBSgQOIbBbppkEOwIBNpXu47tLCBsJJ_pp_3dJCYR-vl6stpARZfj9Xdy0omAFjj0ThtEFlmxz7-s46R62J8sKTDckxcf4"
      },
      {
        "id": "landscaping",
        "title": "Perimeter Landscaping Work",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuC3mrBj6HuK0uK-0j7woo_LNeSP6j6WueF3zQwXmD9AzPOebLAz5r5-1vOdectyRB6x9yEmvpD7sAzjVRAQ7gNGvLV8eEqeCZJ0sLD46ew6tO7P9syTG83CL_oinlGEzjaLVOfrBU7jA5o3b15xPKaCTRl2eSdaBTUMiJ0DYkFD8L-Xku1tM6lTwyXNV9dXe10xKAQ1FunIrY9w9PYfVly_pWSmkjvlv8du2-4KnE29RS5LCX0WbaGM-RvikCikYZ0yUbGWV2kWZKg"
      },
      {
        "id": "infrastructure",
        "title": "Sustainable Infrastructure",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuANwNno3-9nnceTFWVle97RRPJyxVGndaF7hXWJU6YJvTEP5N9fY14Jh4JVZVFwSP7yWrVhE1vRISu0tsH3dt4YiL6Oh70qGbOIzMCSSaWypEX3ha_ohGRk8k1Rl0F5OHrVIx04fM9mj_wSSsxezlsN0M5VH0gyysfTgnlY4O59u95CiUWHy4aZd2ITzgrxF_wZiPyndhfOIBofDuTkgrPj0FaVZRc_mpz5T0dFwYroTTb_MZrmUtxd5SuTwaHYPIsR8emvm0bulQs"
      },
      {
        "id": "trails",
        "title": "Concierge and Nature Trails",
        "image": "https://lh3.googleusercontent.com/aida/AP1WRLuT_DVBPXfG5XHC6a5-6qUKT0gGcpLXRLutI7IWf3-jxojcO9RkdHCp_j9JRwJGMemWddqPsVa2dhwHI5FNncltUWrX4t9t8psmPgBbJIPlIy1lpwIVI-bCvbjUD147hALS4jZOi4AdZV2NHoR-Ig-KAD0p2eXp7bCns4iIsxAo7lGQwtcKbw3cTx5TXZ0xm7Z8TCMD4_E-DT6g-Aft6EQctHbJrSSWQNNDd5ky5yxhOnetPcwZ7z4wpsQ"
      }
    ]
  }$$,
  $${
    "title": "The Smart Choice for Future Generations",
    "description": "Investing in Mountain View Leisure Community is a unique opportunity to combine financial growth with personal fulfillment. By purchasing farm lots in leisure areas, individuals can not only secure a valuable asset but also enjoy recreational activities and a profound connection with nature.",
    "style": "list-mv",
    "items": [
      {
        "icon": "trending_up",
        "title": "Capital Appreciation",
        "description": "Strategic location in the rising leisure corridor of Batangas."
      },
      {
        "icon": "favorite",
        "title": "Personal Fulfillment",
        "description": "A legacy of wellness and serenity for your family."
      }
    ],
    "images": [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByhSoZF5XX4pBWMR0jBdJ0P4zkT8w7erurRVb7KyYXellmwYPpGAnf4mL4bPex0SELmULPqaf0Qlm3ZV7vthctIofiacb_rb9WoXzqaaNqUDVdYSKZHq5HJHMC3KtkRruykQZRKLGjsrrFyX07s0AN_ghm2fr1w81-e-DboeGhft3IPoqCiiPaSKA4xGqnFiQRTbOvV8LJSql4FqmKtxJee0BWjJ-NjwOVG805Hleoe1-jSunI8v5XnQ588dCVuV40jrfpNfvDLNQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC95xmGbfa0dvZVusM_nzzcO3mqzi5wPKEXmS2wa9V2YDn-FnlIZ4JQKoYDm4OFQ0tF_58NGLD0szo0AZ0LLciPgm7WuS5CV4RKQLiCL-kZOMZSP94Zztxd5S-GCvbD_M6BPjjy4bKk2gpODLNuHYwdUSiXgVpxhiLRLchBLMr9-BK5r8AtpCPEQhwB4jt4pK9_dPZMP8iuqs7iBq_RVHwI4w1mBTzsFqk95OL9TLMYn22pRThGP55v0FWQQaB4DtSJGPmy5ORNL34",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPa-aUzzYjCOV77eHKk2zH1R1wfrmJcth9C2Tehfb37RbJFsd5HqymVAcYl9mdINj57sjUq9xBynMd1wy67Ji7OTzEAlzH3uD_iSTvp1LUZF_K1uj1epcbeRrs2IBYkyEJmHxGD-ehb7bS_RRFXXIZ3LellLgrL3w7f-fOXaBRBcVhFyXkMsLyi05oGYOCCIy8Ef1eERO9heXkDGklnPuemS_eZLfas_iKp-4_ImUbddVyJtW1oFmr2EJ-unNkULeTt5rnRVBh_iw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyHtRrF0QrOVRpUVzwA7Hyb-KOc0_tI49xMzf3UdTfyChxK32YQcH45ZbGxfggSrkj0YIVf2uKzzQukWDAmOB0hIpHX-O2I8IEpu5xv1IgnbmEUjgl4nRpGnDr89s6k5rJhbPbiGFGIfT7rgyW6jnkYuTLsyme-Z71KSm-xdCvZ1bbvauU9XolIsiZHQ7PdmkT7sB7vt5r2qqPBLmmJ9p9MrejAr5dztb_4YaDvlza2UxxIsTatOy1E0IO10RwM9EAXe4bhTyk1C0"
    ]
  }$$
);
