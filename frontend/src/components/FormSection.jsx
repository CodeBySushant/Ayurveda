import React from "react";

const FormSection = ({
  title,
  children,
  sectionNumber,
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  className = "",
}) => {
  return (
    <section
      className={`mb-8 p-6 bg-white rounded-xl shadow-md border-t-4 border-indigo-500 ${className}`}
    >
      <h2 className="text-xl font-bold text-indigo-700 mb-5 border-b pb-2">
        {sectionNumber && `${sectionNumber}.`} {title}
      </h2>

      <div className={`grid gap-6 ${columns}`}>
        {children}
      </div>
    </section>
  );
};

export default FormSection;