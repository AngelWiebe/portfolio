export default interface experienceInterface {
  type: string;
  company: string;
  title: string;
  location: string;
  timeline: string;
  work_type: string;
  details: string;
  tech_stack: string;
  preview: string | null;
  preview_description?: string;
  featured_image?: string;
  summary?: string;
  resume?: {
    title?: string;
    company?: string;
    location?: string;
    timeline?: string;
    technicalEnvironment?: string;
    sections: {
      heading?: string;
      intro?: string;
      bullets: string[];
    }[];
  };
  git_link: string;
  site: string | null;
}
