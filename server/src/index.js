import { Router } from 'itty-router';
import { json, text } from 'itty-router';

const router = Router();

// Default data structure
const DEFAULT_DATA = {
  profile: {
    name: "Your Name",
    role: "Full-Stack Developer",
    summary: "Short bio about you.",
    location: "City, Country",
    email: "you@email.com",
    photo: ""
  },
  projects: [
    {
      title: "Project One",
      description: "What it does and why it matters.",
      tech: ["Vue", "Node.js"],
      link: "https://example.com"
    }
  ],
  skills: ["JavaScript", "Vue", "Node.js"],
  experience: [
    {
      company: "Company Name",
      role: "Job Title",
      period: "2024 - Present",
      details: "Key achievements and responsibilities."
    }
  ],
  contact: {
    phone: "+62 812-0000-0000",
    email: "you@email.com",
    linkedin: "https://linkedin.com/in/yourname",
    github: "https://github.com/yourname"
  }
};

// Helper functions
async function readDb(env) {
  const data = await env.DB.get('portfolio', 'json');
  return data || DEFAULT_DATA;
}

async function writeDb(env, data) {
  await env.DB.put('portfolio', JSON.stringify(data));
  return data;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Portfolio endpoints
router.get('/api/portfolio', async (req, env) => {
  const data = await readDb(env);
  return json(data, { headers: corsHeaders });
});

router.put('/api/portfolio', async (req, env) => {
  const data = await req.json();
  const result = await writeDb(env, data);
  return json(result, { headers: corsHeaders });
});

// Profile endpoints
router.get('/api/profile', async (req, env) => {
  const data = await readDb(env);
  return json(data.profile, { headers: corsHeaders });
});

router.put('/api/profile', async (req, env) => {
  const profileData = await req.json();
  const data = await readDb(env);
  data.profile = profileData;
  const result = await writeDb(env, data);
  return json(result.profile, { headers: corsHeaders });
});

// Projects endpoints
router.get('/api/projects', async (req, env) => {
  const data = await readDb(env);
  return json(data.projects, { headers: corsHeaders });
});

router.put('/api/projects', async (req, env) => {
  const projects = await req.json();
  const data = await readDb(env);
  data.projects = projects;
  const result = await writeDb(env, data);
  return json(result.projects, { headers: corsHeaders });
});

// Skills endpoints
router.get('/api/skills', async (req, env) => {
  const data = await readDb(env);
  return json(data.skills, { headers: corsHeaders });
});

router.put('/api/skills', async (req, env) => {
  const skills = await req.json();
  const data = await readDb(env);
  data.skills = skills;
  const result = await writeDb(env, data);
  return json(result.skills, { headers: corsHeaders });
});

// Experience endpoints
router.get('/api/experience', async (req, env) => {
  const data = await readDb(env);
  return json(data.experience, { headers: corsHeaders });
});

router.put('/api/experience', async (req, env) => {
  const experience = await req.json();
  const data = await readDb(env);
  data.experience = experience;
  const result = await writeDb(env, data);
  return json(result.experience, { headers: corsHeaders });
});

// Contact endpoints
router.get('/api/contact', async (req, env) => {
  const data = await readDb(env);
  return json(data.contact, { headers: corsHeaders });
});

router.put('/api/contact', async (req, env) => {
  const contact = await req.json();
  const data = await readDb(env);
  data.contact = contact;
  const result = await writeDb(env, data);
  return json(result.contact, { headers: corsHeaders });
});

// Profile photo endpoint
router.post('/api/profile/photo', async (req, env) => {
  try {
    const formData = await req.formData();
    const file = formData.get('photo');

    if (!file) {
      return json({ error: 'No file uploaded' }, { status: 400, headers: corsHeaders });
    }

    const buffer = await file.arrayBuffer();
    const filename = `profile-${Date.now()}.${file.name.split('.').pop()}`;

    // Upload to R2
    await env.BUCKET.put(`uploads/${filename}`, buffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // Update profile with photo URL
    const data = await readDb(env);
    data.profile = data.profile || {};
    data.profile.photo = `/uploads/${filename}`;
    await writeDb(env, data);

    return json({ photo: data.profile.photo }, { headers: corsHeaders });
  } catch (error) {
    return json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
});

// Serve uploaded files
router.get('/uploads/:filename', async (req, env) => {
  const { filename } = req.params;
  try {
    const object = await env.BUCKET.get(`uploads/${filename}`);
    if (!object) {
      return text('Not found', { status: 404 });
    }
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      },
    });
  } catch (error) {
    return text('Error', { status: 500 });
  }
});

// Health check
router.get('/health', () => json({ status: 'ok' }));

// 404 handler
router.all('*', () => json({ error: 'Not found' }, { status: 404 }));

export default {
  fetch(request, env, ctx) {
    return router.handle(request, env, ctx);
  },
};
