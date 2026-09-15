import { FeaturedArticle } from "@/components/noticias/FeaturedArticle";
import { ArticleCard } from "@/components/noticias/ArticleCard";
import { PropertyCarousel } from "@/components/noticias/PropertyCarousel";
import { getFeaturedProperties } from "@/lib/db/properties";
import Link from "next/link";

export const metadata = {
  title: "Noticias Inmobiliarias | PUBLICASA.co",
  description: "Datos, cifras y tendencias del sector inmobiliario colombiano para tomar mejores decisiones.",
};

const ARTICLES = [
  {
    id: 1,
    category: "Mercado Nacional",
    isNew: true,
    title: "El 62 % de los colombianos no tiene vivienda propia: las cifras que explican el rezago",
    excerpt: "Solo el 38,1 % de los hogares colombianos habitan vivienda propia según el DANE. Entre jóvenes de 18 a 35 años, ese porcentaje cae a 9,8 %.",
    content: `Solo el 38,1 % de los hogares colombianos habitan vivienda propia según el DANE. Entre jóvenes de 18 a 35 años, ese porcentaje cae a 9,8 %. Reunir la cuota inicial exige en promedio 57 meses de ingresos brutos.

El acceso a vivienda propia en Colombia sigue siendo un desafío estructural. Los datos del Departamento Administrativo Nacional de Estadística (DANE) revelan una brecha profunda entre la demanda de vivienda y la oferta asequible. La situación es aún más crítica en la población joven, donde menos del 10 % accede a una vivienda de su propiedad.

Los costos de entrada al mercado inmobiliario han alcanzado máximos históricos. Para reunir una cuota inicial típica del 20-30 %, un hogar promedio necesita entre 4 y 5 años de ahorro bruto sin considerar otros gastos. Esta barrera ha contribuido a que el arrendamiento siga siendo la opción predominante en áreas urbanas.

**Factores que profundizan el rezago:**
- Tasas hipotecarias altas (aunque en descenso)
- Precios de terreno inflados por especulación
- Dificultades en acceso a crédito de largo plazo
- Insuficiente oferta de vivienda de interés social

Las iniciativas gubernamentales de subsidio y crédito blando han tenido alcance limitado. Se estima que el déficit de vivienda en Colombia supera los 1,2 millones de unidades.`,
    stat: { value: "57", label: "meses de ingreso bruto para cuota inicial promedio" },
    author: "Equipo PublicAsa",
    date: "10 Sep 2025",
    readTime: "6 min lectura",
  },
  {
    id: 2,
    category: "Sabana de Bogotá",
    isNew: false,
    title: "Sabana de Bogotá: los municipios con mayor valorización del metro cuadrado en 2025",
    excerpt: "Chía, Cajicá, Mosquera, Funza y Zipaquirá concentran la demanda que Bogotá ya no puede absorber.",
    content: `Chía, Cajicá, Mosquera, Funza y Zipaquirá concentran la demanda que Bogotá ya no puede absorber. El Regiotram de Occidente y la saturación capitalina reconfiguran el mapa de precios: desde $1,8 M/m² en Zipaquirá hasta más de $5 M en conjuntos cerrados de Chía.

La Sabana de Bogotá ha experimentado una transformación acelerada en los últimos 3 años. Mientras que en Bogotá los precios se han estancado por saturación del suelo disponible, los municipios aledaños ofrecen alternativas con mejor relación precio-área.

**Municipios con mayor valorización (2021-2025):**

**Chía:** El líder indiscutible. Precios entre $3.5 y $5.2 millones por metro cuadrado en proyectos cerrados. La conectividad vía Autopista Norte y la oferta comercial han atraído población de altos ingresos.

**Cajicá:** Alternativa más accesible con precios entre $2.1 y $3.8 M/m². El desarrollo de la Calle 254 y la conexión vía Zipaquirá lo posicionan como destino de clase media-alta. Valorización acumulada del 8.2% anual.

**Mosquera:** Expansión hacia occidente. Precios entre $1.5 y $2.8 M/m². Movimiento especulativo importante por anuncios del Regiotram.

**Zipaquirá y Funza:** Entrada del mercado formal a precios más bajos ($1.2-2.0 M/m²). Atrae primera vivienda e inversión de portafolio.

El Regiotram de Occidente, cuando entre en operación, puede acentuar estos movimientos o crear nuevas centralidades en municipios actualmente dormitorio.`,
    stat: { value: "+8%", label: "valorización real anual corredor norte (2021–2024)" },
    author: "Equipo PublicAsa",
    date: "28 Ago 2025",
    readTime: "8 min lectura",
  },
  {
    id: 3,
    category: "Financiación",
    isNew: false,
    title: "Tasas hipotecarias en Colombia bajaron más de 350 puntos: ¿es momento de comprar?",
    excerpt: "El Banco de la República acumuló más de 550 puntos básicos de recortes desde su pico de 13,25 % en 2023.",
    content: `El Banco de la República acumuló más de 550 puntos básicos de recortes desde su pico de 13,25 % en 2023. El impacto es concreto: el mismo crédito de $200 millones a 20 años cuesta hasta $600.000 pesos menos al mes.

**El ciclo de tasas en perspectiva:**

Hace apenas 18 meses, en octubre de 2023, la tasa de referencia del Banco de la República alcanzó su máximo de 13,25%. A pesar de que aún está en niveles "altos" históricamente, los recortes acumulados representan un cambio significativo para el sector hipotecario.

Actualmente en torno al 11%, la tasa de referencia ha permitido que los bancos reduzcan sus tasas activas hipotecarias desde máximos de 13-14% hasta rangos de 10-11% en modalidad de crédito a tasa fija.

**¿Qué significa en dinero?**

Para un crédito de $200 millones a 20 años:
- A 13,5% EA: cuota mensual aproximada de $2.67 millones
- A 10,8% EA: cuota mensual aproximada de $2.07 millones
- **Diferencia:** $600.000 menos al mes

Esa diferencia acumulada a 20 años representa más de $144 millones en menor costo.

**Perspectivas para 2025:**

El Banco de la República continúa bajo un ciclo de flexibilización. Analistas esperan entre 2-3 recortes adicionales de 25 pb en lo que resta del año, llevando la tasa a aproximadamente 10%.

Sin embargo, la inflación permanece como factor limitante. Mientras se mantenga en el rango de 3-4% (por encima del target de 3%), los recortes serán graduales.

**¿Es el momento de comprar?**

**Argumentos a favor:**
- Tasas en tendencia bajista
- Mejor poder adquisitivo relativo
- Oferta inmobiliaria estable

**Conclusión:** El abaratamiento de crédito definitivamente hace la vivienda más accesible, pero no por sí solo resuelve la ecuación económica.`,
    stat: { value: "−$600k", label: "menos de cuota mensual por cada $200 M financiados" },
    author: "Equipo PublicAsa",
    date: "15 Jul 2025",
    readTime: "9 min lectura",
  },
];

export default async function NoticiasPage() {
  const featuredProperties = await getFeaturedProperties(6);
  const shuffledProperties = featuredProperties
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <main className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-xs font-bold text-brand-green uppercase tracking-wider mb-2">
            Mercado inmobiliario
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Noticias y análisis
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Datos, cifras y tendencias del sector inmobiliario colombiano para tomar mejores decisiones.
          </p>
        </div>

        <FeaturedArticle article={ARTICLES[0]} />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {ARTICLES.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <PropertyCarousel properties={shuffledProperties} />
      </div>
    </main>
  );
}
