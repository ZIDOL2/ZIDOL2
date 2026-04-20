'use client';
import dynamic from 'next/dynamic';

const PutImg = dynamic(() => import('@/components/upload/PutImg'), {
  ssr: false,
});

export default function UploadPage() {
  return <PutImg />;
}
