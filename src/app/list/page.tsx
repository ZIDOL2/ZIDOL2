'use client';
import dynamic from 'next/dynamic';

const ImgList = dynamic(() => import('@/components/list/ImgList'), {
  ssr: false,
});

export default function ListPage() {
  return <ImgList />;
}
