import { Dashboard } from '@/components/dashboard/Dashboard'
import MainLayout from '@/components/layout/MainLayout'

export default function Home() {
  return <MainLayout rightCards={[]}><Dashboard /></MainLayout>
}