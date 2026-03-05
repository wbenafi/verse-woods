"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft, Loader2 } from "lucide-react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface IdeaEditorProps {
  ideaId?: string;
}

const AUTOSAVE_DELAY_MS = 800;

export function IdeaEditor({ ideaId }: IdeaEditorProps) {
  const router = useRouter();
  const createIdea = useMutation(api.ideas.create);
  const updateIdea = useMutation(api.ideas.update);

  const idea = useQuery(
    api.ideas.getById,
    ideaId ? { id: ideaId as Id<"ideas"> } : "skip"
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<{ title: string; content: string } | null>(null);
  const activeIdeaIdRef = useRef<string | undefined>(ideaId);

  // Create an idea if none provided
  useEffect(() => {
    if (!ideaId && !isCreating) {
      setIsCreating(true);
      createIdea({}).then((newId) => {
        router.replace(`/write?ideaId=${newId}`);
      });
    }
  }, [ideaId, isCreating, createIdea, router]);

  // Sync remote data into local state once on load
  useEffect(() => {
    if (idea && !isInitialized) {
      setTitle(idea.title ?? "");
      setContent(idea.content ?? "");
      lastSavedRef.current = {
        title: idea.title ?? "",
        content: idea.content ?? "",
      };
      setIsInitialized(true);
    }
  }, [idea, isInitialized]);

  useEffect(() => {
    activeIdeaIdRef.current = ideaId;
  }, [ideaId]);

  const save = useCallback(
    async (titleVal: string, contentVal: string) => {
      const currentId = activeIdeaIdRef.current;
      if (!currentId) return;

      const alreadySaved =
        lastSavedRef.current?.title === titleVal &&
        lastSavedRef.current?.content === contentVal;
      if (alreadySaved) return;

      setSaveStatus("saving");
      try {
        await updateIdea({
          id: currentId as Id<"ideas">,
          title: titleVal,
          content: contentVal,
        });
        lastSavedRef.current = { title: titleVal, content: contentVal };
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch {
        setSaveStatus("error");
      }
    },
    [updateIdea]
  );

  const scheduleAutosave = useCallback(
    (titleVal: string, contentVal: string) => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
      setSaveStatus("idle");
      autosaveTimerRef.current = setTimeout(() => {
        save(titleVal, contentVal);
      }, AUTOSAVE_DELAY_MS);
    },
    [save]
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    scheduleAutosave(val, content);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    scheduleAutosave(title, val);
  };

  const handleSaveNow = () => {
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }
    save(title, content);
  };

  // Flush on unmount
  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, []);

  const isLoading = !ideaId || isCreating || (ideaId && idea === undefined);
  const isNotFound = ideaId && !isCreating && idea === null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-foreground/40">
        <Loader2 className="h-5 w-5 animate-spin mr-2" />
        <span className="text-sm">Cargando...</span>
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-40 text-center">
        <p className="text-sm text-foreground/60">
          Esta idea no existe o no tienes acceso.
        </p>
        <Button variant="poetic-ghost" size="sm" onClick={handleSaveNow}>
          Nueva idea
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 gap-3">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>

        <SaveIndicator status={saveStatus} />
      </div>

      {/* Editor */}
      <div className="flex flex-col gap-3 flex-1">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Título de la idea..."
          className="w-full text-xl md:text-2xl font-bold text-primary italic bg-transparent border-none outline-none placeholder:text-foreground/30 focus:ring-0"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Escribe lo que sea, y deja que tu espíritu fluya en cada verso..."
          className="flex-1 w-full min-h-[300px] text-base text-foreground bg-transparent border-none outline-none resize-none placeholder:text-foreground/30 focus:ring-0 leading-relaxed"
        />
      </div>
    </div>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  const map: Record<SaveStatus, { text: string; className: string }> = {
    idle:   { text: "",           className: "text-foreground/30" },
    saving: { text: "Guardando",     className: "text-foreground/70" },
    saved:  { text: "Guardado",         className: "text-foreground/70" },
    error:  { text: "Error al guardar", className: "text-destructive"   },
  };

  const config = map[status];

  return (
    <span className={`text-xs transition-colors duration-300 ${config.className}`}>
      {config.text}
    </span>
  );
}
