import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BentoGrid } from '@/components/dashboard/BentoGrid';
import { FullSkeletonGrid } from '@/components/ui/Skeletons';

export default function Loading() {
  return (
    <DashboardLayout>
      <BentoGrid>
        <FullSkeletonGrid />
      </BentoGrid>
    </DashboardLayout>
  );
}
