import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const TopBar = () => {
  return (
    <div className="border-b px-6 py-2 flex justify-between items-center">
      <h1 className="text-base font-black uppercase font-mono">AllSpark</h1>
      <Link href="/configure">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default TopBar;