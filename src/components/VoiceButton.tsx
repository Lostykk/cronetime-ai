import { useCallback, useRef, useState } from "react";

const API = "https://sofia-server-production-5c12.up.railway.app";

interface Props {
  acento: string;
  disabled?: boolean;
  onTranscript: (texto: string) => void;
}

// Botón de mic compacto para el input del chat de demo: graba, transcribe
// (Deepgram vía /api/voz/transcribir) y le pasa el texto al chat como si el
// usuario lo hubiera tipeado — el envío y la respuesta los maneja el widget.
export function VoiceButton({ acento, disabled, onTranscript }: Props) {
  const [estado, setEstado] = useState<"idle" | "recording" | "processing">("idle");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        procesarAudio();
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setEstado("recording");
    } catch {
      alert("No se pudo acceder al micrófono. Verificá los permisos del navegador.");
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
  }, []);

  async function procesarAudio() {
    setEstado("processing");
    try {
      const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.webm");

      const res = await fetch(`${API}/api/voz/transcribir`, { method: "POST", body: formData });
      const data = await res.json();
      if (data.texto?.trim()) onTranscript(data.texto.trim());
    } catch {
      // Sin transcripción no pasa nada: el usuario puede reintentar o tipear.
    } finally {
      setEstado("idle");
    }
  }

  function toggle() {
    if (disabled) return;
    if (estado === "recording") stopRecording();
    else if (estado === "idle") startRecording();
  }

  const labels = { idle: "Hablar", recording: "Grabando… tocá para parar", processing: "Procesando…" };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled || estado === "processing"}
      title={labels[estado]}
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
      style={{
        background: estado === "recording" ? "#ef4444" : "var(--film-border)",
        color: estado === "recording" ? "#fff" : "var(--bone)",
        boxShadow: estado === "idle" ? `inset 0 0 0 1px ${acento}33` : "none",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {estado === "processing" ? "⏳" : estado === "recording" ? "⏹" : "🎙"}
    </button>
  );
}
