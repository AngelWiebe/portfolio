import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

function formatTime(seconds: number): string {
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

interface PreviewPlayerProps {
  src: string;
  descriptionId?: string;
}

export default function PreviewPlayer({ src, descriptionId }: PreviewPlayerProps) {
  const { t } = useTranslation();
  const video = useRef<FullscreenVideo>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const canFullscreen = document.fullscreenEnabled ||
    "webkitEnterFullscreen" in HTMLVideoElement.prototype;

  const togglePlayback = async () => {
    const element = video.current;
    if (!element) return;

    if (!element.paused) {
      element.pause();
      return;
    }

    try {
      await element.play();
      setPlaybackFailed(false);
    } catch {
      setPlaybackFailed(true);
    }
  };

  const enterFullscreen = () => {
    const element = video.current;
    if (!element) return;

    if (document.fullscreenEnabled) {
      void element.parentElement?.requestFullscreen().catch(() => undefined);
    } else {
      element.webkitEnterFullscreen?.();
    }
  };

  return (
    <div className="preview-player">
      <video
        ref={video}
        src={src}
        preload="metadata"
        playsInline
        muted={muted}
        aria-label={t("aria.preview_video")}
        aria-describedby={descriptionId}
        data-testid="video"
        onDurationChange={({ currentTarget }) => {
          setDuration(Number.isFinite(currentTarget.duration) ? currentTarget.duration : 0);
        }}
        onTimeUpdate={({ currentTarget }) => setPosition(currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setPlaybackFailed(true)}
      />

      <div className="preview-controls">
        <Button onClick={() => void togglePlayback()}>
          {t(playing ? "preview_player.pause" : "preview_player.play")}
        </Button>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={position}
          disabled={!duration}
          aria-label={t("preview_player.seek")}
          aria-valuetext={formatTime(position)}
          onChange={(event) => {
            const element = video.current;
            if (!element) return;
            element.currentTime = event.currentTarget.valueAsNumber;
            setPosition(element.currentTime);
          }}
        />
        <span className="preview-time">{formatTime(position)} / {formatTime(duration)}</span>
        <Button onClick={() => setMuted((previous) => !previous)}>
          {t(muted ? "preview_player.unmute" : "preview_player.mute")}
        </Button>
        {canFullscreen && (
          <Button onClick={enterFullscreen}>{t("preview_player.fullscreen")}</Button>
        )}
      </div>

      {playbackFailed && <p role="status">{t("preview_player.error")}</p>}
    </div>
  );
}
