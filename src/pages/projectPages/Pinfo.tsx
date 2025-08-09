import React from "react";

export default function WebsiteInfoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
  <h1 className="text-4xl font-bold mb-6 text-center">🚀 Welcome to JustCrea8</h1>

  {/* Vision Section */}
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-3">🌟 Our Vision</h2>
    <p className="text-base leading-relaxed">
      JustCrea8 was born out of the belief that <strong>creativity thrives when collaboration is frictionless</strong>.
      Our platform empowers khanelopers, designers, and digital creators to <span className="text-blue-600 dark:text-blue-400">connect, build, and launch</span> real-world projects — together.
    </p>
  </section>

  {/* What is JustCrea8 */}
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-3">🔧 What is JustCrea8?</h2>
    <p className="text-base leading-relaxed">
      JustCrea8 is a collaborative workspace that blends your <strong>portfolio, social network, and project board</strong> into one streamlined experience. Whether you’re a student, freelancer, or startup co-founder, you can:
    </p>
    <ul className="list-disc ml-6 mt-4 space-y-2">
      <li>Showcase your skills and projects with a beautiful profile</li>
      <li>Find and join active projects aligned with your interests</li>
      <li>Build in public and grow your creative footprint</li>
    </ul>
  </section>

  {/* Project Management Section */}
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-3">📁 Project Management</h2>
    <p className="text-base leading-relaxed mb-4">
      The Project Management section is where your ideas turn into reality. We provide creators with the structure and tools to deliver their vision:
    </p>
    <ul className="list-disc ml-6 space-y-2">
      <li><strong>Kanban Boards</strong> to track tasks and status</li>
      <li><strong>Milestones</strong> for key deliverables and deadlines</li>
      <li><strong>Team Roles</strong> and task assignment for smooth collaboration</li>
      <li><strong>Progress Tracking</strong> with activity logs and progress bars</li>
      <li><strong>Asset Management</strong> for files, Figma links, and GitHub repos</li>
    </ul>
  </section>

  {/* Community Ecosystem */}
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-3">🤝 Community Ecosystem</h2>
    <p className="text-base leading-relaxed">
      Beyond project tools, JustCrea8 is a place to grow your <strong>network and personal brand</strong>. Connect with creators across disciplines, collaborate on ideas, and turn side projects into startups.
    </p>
  </section>

  {/* Creator Section */}
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-3">🧑‍💻 Meet the Creator</h2>
    <p className="text-base leading-relaxed">
      Hi, I'm <span className="font-medium text-blue-600 dark:text-blue-400">Asif</span>, the creator of JustCrea8.
      This platform was born from my passion for <strong>building in public, connecting with talented creators, and turning ideas into impactful projects</strong>.
    </p>
    <p className="mt-3 text-base leading-relaxed">
      I believe that creativity shouldn't be siloed — it should be shared, refined, and launched with a team. My goal with JustCrea8 is to make project collaboration feel natural, intentional, and fulfilling.
    </p>
    <div className="mt-4 text-sm text-muted-foreground space-y-1">
      <p><strong>Email:</strong> <a href="mailto:asifkhan.tech.2003@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">asifkhan.tech.2003@gmail.com.com</a></p>
      <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/asif-khan003" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">linkedin.com/in/asifkhan</a></p>
      <p><strong>GitHub:</strong> <a href="https://github.com/Mr-Asif003" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/asifkhan</a></p>
      <p><strong>Portfolio:</strong> <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">asifkhan.com</a></p>
    </div>
  </section>

  {/* Call to Action */}
  <section className="text-center mt-12">
    <h3 className="text-xl font-semibold mb-2">✨ Ready to Build?</h3>
    <p className="mb-4">Join the community and start creating meaningful projects today.</p>
    <a href="/project" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
      Get Started
    </a>
  </section>
</div>

  );
}
