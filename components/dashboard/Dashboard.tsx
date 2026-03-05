"use client";

import { Card } from "../ui/card";
import { getItemContent, getItemTitle } from "@/lib/ideas.utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/es";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("es");

export function Dashboard() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const ideas = useQuery(api.ideas.listByUser, isAuthenticated ? {} : "skip");
  const lyrics = useQuery(api.lyrics.listByUser, isAuthenticated ? {} : "skip");

  const ideaItems = ideas ?? [];
  const lyricItems = lyrics ?? [];

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
              {ideaItems.length === 0 && (
                <Card className="p-4 bg-background border-2 border-foreground/20 col-span-full text-center">
                  <p className="text-sm text-foreground/60">
                    Aun no tienes ideas guardadas en Convex.
                  </p>
                </Card>
              )}
              {ideaItems.map((idea) => (
                <Card
                  key={idea._id}
                  className="p-4 bg-background border-2 border-foreground/20 grid [grid-template-rows:subgrid] row-span-2"
                >
                  <div>
                    <h4 className="text-base font-bold text-primary italic line-clamp-2">
                      {getItemTitle({
                        title: idea.title,
                        content: idea.content ?? null,
                      })}
                    </h4>
                    <span className="text-sm font-normal text-foreground italic line-clamp-2 mt-2">
                      {getItemContent({
                        title: idea.title,
                        content: idea.content ?? null,
                      })}
                    </span>
                  </div>
                  <span className="text-xs font-normal text-foreground/50">
                    {dayjs
                      .utc(new Date(idea.updatedAt).toISOString())
                      .fromNow()}
                  </span>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <h3 className="text-lg font-bold text-gray-700">Letras</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 grid-rows-[repeat(2,auto)]">
              {lyricItems.length === 0 && (
                <Card className="p-4 bg-background border-2 border-foreground/20 col-span-full text-center">
                  <p className="text-sm text-foreground/60">
                    Aun no tienes letras guardadas.
                  </p>
                </Card>
              )}
              {lyricItems.map((lyric) => (
                <Card
                  key={lyric._id}
                  className="p-4 bg-background border-2 border-foreground/20 grid [grid-template-rows:subgrid] row-span-2"
                >
                  <div>
                    <h4 className="text-lg font-bold text-primary italic line-clamp-2">
                      {getItemTitle({
                        title: lyric.name,
                        content: lyric.content ?? null,
                      })}
                    </h4>
                    <textarea
                      className="text-sm font-normal text-foreground italic mt-2 resize-none w-full bg-transparent border-none focus:outline-none focus:ring-0 focus:border-none overflow-hidden"
                      value={getItemContent({
                        title: lyric.name,
                        content: lyric.content ?? null,
                      }) ?? ""}
                      readOnly
                      rows={7}
                    />
                  </div>
                  <span className="text-sm font-normal text-foreground/50">
                    {dayjs
                      .utc(new Date(lyric.updatedAt).toISOString())
                      .fromNow()}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isAuthLoading && (
        <p className="text-sm text-foreground/50">Cargando autenticación...</p>
      )}
    </>
  );
}
