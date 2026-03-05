import { createClient } from "@/utils/subabase/server";
import { Card } from "../ui/card";
import { getItemContent, getItemTitle } from "@/lib/ideas.utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("es");

export async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ideasQuery = (() => {
    const query = supabase.from("idea").select("*");

    if (user?.id) {
      query.eq("created_by", user.id);
    }

    query.order("updated_at", { ascending: false });

    query.limit(3);

    return query;
  })();

  const lyricsQuery = (() => {
    const query = supabase.from("lyrics").select("*");

    if (user?.id) {
      query.eq("created_by", user.id);
    }

    query.order("updated_at", { ascending: false });

    query.limit(6);

    return query;
  })(); 

  const { data: ideas } = await ideasQuery;

  const { data: lyrics } = await lyricsQuery;

  return (
    <>
      <div className="mb-8 ">
        <h2 className={`text-2xl md:text-3xl font-bold text-primary text-fraunces`}>
          Hola! Escribe lo que sea, y deja que tu espíritu fluya en cada verso
        </h2>
        <div className="flex flex-col gap-y-6 mt-6">
          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg font-bold text-gray-700">Ideas recientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-[repeat(2,auto)]">
              {(() => {
                const testIdeas = [
                  {
                    id: 1,
                    title: "Inspiración Matutina",
                    content: "Una idea que surgió al amanecer, cuando la luz del sol ilumina todo con esperanza y nuevas posibilidades.",
                    created_at: new Date().toISOString(),
                    created_by: null,
                    updated_at: new Date().toISOString(),
                    lyrics: null,
                  },
                  {
                    id: 2,
                    title: "Reflexión Nocturna",
                    content: "Pensamientos que aparecen en la quietud de la noche, cuando todo está en calma y la mente puede vagar libremente.",
                    created_at: new Date().toISOString(),
                    created_by: null,
                    updated_at: new Date().toISOString(),
                    lyrics: null,
                  },
                  {
                    id: 3,
                    title: "Momento de Creatividad",
                    content: "Una chispa de creatividad que puede convertirse en algo grande, solo necesita ser capturada y desarrollada.",
                    created_at: new Date().toISOString(),
                    created_by: null,
                    updated_at: new Date().toISOString(),
                    lyrics: null,
                  },
                ];
                return (ideas && ideas.length > 0 ? ideas : testIdeas);
              })().map((idea) => (
                <Card
                  key={idea.id}
                  className="p-4 bg-background border-2 border-foreground/20 grid [grid-template-rows:subgrid] row-span-2"
                >
                  <div>
                    <h4 className="text-base font-bold text-primary italic line-clamp-2">
                      {getItemTitle(idea)}
                    </h4>
                    <span className="text-sm font-normal text-foreground italic line-clamp-2 mt-2">
                      {getItemContent(idea)}
                    </span>
                  </div>
                  <span className="text-xs font-normal text-foreground/50">
                    {dayjs.utc(idea.updated_at).fromNow()}
                  </span>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg font-bold text-gray-700">Letras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-[repeat(2,auto)]">
              {(() => {
                const testLyrics = [
                  {
                    id: 1,
                    name: "Canción de Prueba",
                    content: "Esta es una canción de prueba\nPara ver cómo se ve el diseño\nCuando no hay datos reales\nSolo texto de ejemplo",
                    created_at: new Date().toISOString(),
                    created_by: null,
                    updated_at: new Date().toISOString(),
                  },
                  {
                    id: 2,
                    name: "Versos del Alma",
                    content: "En el silencio de la noche\nMis pensamientos vuelan libres\nComo pájaros en el cielo\nBuscando su destino",
                    created_at: new Date().toISOString(),
                    created_by: null,
                    updated_at: new Date().toISOString(),
                  },
                  {
                    id: 3,
                    name: "Melodía Perdida",
                    content: "Una melodía que se perdió\nEn los recuerdos del ayer\nSigue sonando en mi mente\nComo un eco que no se va",
                    created_at: new Date().toISOString(),
                    created_by: null,
                    updated_at: new Date().toISOString(),
                  },
                ];
                return (lyrics && lyrics.length > 0 ? lyrics : testLyrics);
              })().map((lyric) => (
                <Card
                  key={lyric.id}
                  className="p-4 bg-background border-2 border-foreground/20 grid [grid-template-rows:subgrid] row-span-2"
                >
                  <div>
                    <h4 className="text-lg font-bold text-primary italic line-clamp-2">
                      {getItemTitle({
                        title: lyric.name,
                        content: lyric.content,
                      })}
                    </h4>
                    <textarea
                      className="text-sm font-normal text-foreground italic mt-2 resize-none w-full bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none overflow-hidden"
                      value={getItemContent({
                        title: lyric.name,
                        content: lyric.content,
                      }) ?? ""}
                      readOnly
                      rows={7}
                    />
                  </div>
                  <span className="text-sm font-normal text-foreground/50">
                    {dayjs.utc(lyric.updated_at).fromNow()}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
