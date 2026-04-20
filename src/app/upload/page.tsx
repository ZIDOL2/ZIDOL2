'use client';
import dynamic from 'next/dynamic';

const PutImg = dynamic(() => import('@/components/PutImg'), { ssr: false });

export default function UploadPage() {
  return <PutImg />;
}
