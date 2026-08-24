'use client';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard`);
    } catch (error) {
      toast.error(`Failed to copy ${label}`);
      console.error(`Failed to copy ${label}`, error);
    }
  };
  return (
    <>
      <Button className="cursor-pointer" variant="outline" size="icon" onClick={handleCopy}>
        <Copy className="h-4 w-4" />
      </Button>
    </>
  );
};
export default CopyButton;
