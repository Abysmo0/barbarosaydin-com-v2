// src/components/ServiceCard.js
export default function ServiceCard({ title, description, icon, link }) {
  return (
    <a href={link} className="block bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* İkon renkleri güncellendi */}
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-blue/10 text-brand-blue mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </a>
  );
}