"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  song: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ song }) => {
  const router = useRouter();
  const onPlay = useOnPlay(song);
  const { isLoading, user } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (song.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No Liked songs
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-6 ">
      {song.map((song) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem onClick={() => onPlay(song.id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
