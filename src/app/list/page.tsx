'use client';
import dynamic from 'next/dynamic';

const ImgList = dynamic(() => import('@/components/ImgList'), { ssr: false });

export default function ListPage() {
  return <ImgList />;
}
