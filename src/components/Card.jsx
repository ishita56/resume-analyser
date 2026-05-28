export default function Card({
  title,
  description,
  icon: Icon,
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition duration-300">

      <Icon className="text-indigo-600 w-7 h-7 mb-4" />

      <h2 className="text-2xl font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

    </div>
  );
}