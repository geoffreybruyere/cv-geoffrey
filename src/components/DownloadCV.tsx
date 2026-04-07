import { pdf } from '@react-pdf/renderer';
import { CVDocument } from './CVDocument';

export function DownloadCV({ className, label = '1-pager' }: { className?: string; label?: string }) {
  const handleDownload = async () => {
    const blob = await pdf(<CVDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Geoffrey-Bruyere-CV.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className={className}>
      ↓ {label}
    </button>
  );
}
