import Link from "next/link";

type SeoColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

const COLUMNS: SeoColumn[] = [
  {
    heading: "Apartamentos en venta y arriendo",
    links: [
      { label: "Apartamentos en venta Bogotá", href: "/inmuebles?tipo=APARTAMENTO&operacion=VENTA&q=Bogotá" },
      { label: "Apartamentos en venta Medellín", href: "/inmuebles?tipo=APARTAMENTO&operacion=VENTA&q=Medellín" },
      { label: "Apartamentos en venta Barranquilla", href: "/inmuebles?tipo=APARTAMENTO&operacion=VENTA&q=Barranquilla" },
      { label: "Apartamentos en venta Cali", href: "/inmuebles?tipo=APARTAMENTO&operacion=VENTA&q=Cali" },
      { label: "Apartamentos en venta Cartagena", href: "/inmuebles?tipo=APARTAMENTO&operacion=VENTA&q=Cartagena" },
    ],
  },
  {
    heading: "Casas en venta y arriendo",
    links: [
      { label: "Casas en venta Bogotá", href: "/inmuebles?tipo=CASA&operacion=VENTA&q=Bogotá" },
      { label: "Casas en venta Medellín", href: "/inmuebles?tipo=CASA&operacion=VENTA&q=Medellín" },
      { label: "Casas en venta Cali", href: "/inmuebles?tipo=CASA&operacion=VENTA&q=Cali" },
      { label: "Casas en venta Barranquilla", href: "/inmuebles?tipo=CASA&operacion=VENTA&q=Barranquilla" },
      { label: "Casas en venta Chía", href: "/inmuebles?tipo=CASA&operacion=VENTA&q=Chía" },
    ],
  },
  {
    heading: "Proyectos nuevos en Colombia",
    links: [
      { label: "Proyectos nuevos en toda Colombia", href: "/inmuebles" },
      { label: "Proyectos de vivienda nueva", href: "/inmuebles" },
      { label: "Proyectos nuevos en Bogotá", href: "/inmuebles?q=Bogotá" },
      { label: "Proyectos nuevos en Barranquilla", href: "/inmuebles?q=Barranquilla" },
      { label: "Proyectos nuevos en Cajicá", href: "/inmuebles?q=Cajicá" },
    ],
  },
  {
    heading: "Otros inmuebles en venta y arriendo",
    links: [
      { label: "Inmuebles en venta", href: "/inmuebles?operacion=VENTA" },
      { label: "Inmuebles en arriendo", href: "/inmuebles?operacion=ARRIENDO" },
      { label: "Finca raíz en venta", href: "/inmuebles?operacion=VENTA" },
      { label: "Finca raíz en arriendo", href: "/inmuebles?operacion=ARRIENDO" },
      { label: "Fincas en venta", href: "/inmuebles?tipo=LOTE&operacion=VENTA" },
    ],
  },
];

export function SeoLinks() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Inmuebles en venta y arriendo en Colombia
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="font-bold text-gray-900">{column.heading}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-brand-blue hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-xl font-extrabold text-brand-blue sm:text-2xl">
          Próximamente una nueva forma de invertir
        </p>
      </div>
    </section>
  );
}
