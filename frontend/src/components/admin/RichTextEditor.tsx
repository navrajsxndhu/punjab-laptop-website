'use client';

import { useRef, useEffect } from 'react';
import { Bold, Italic, Heading2, List, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
  minHeight?: string;
}

export function RichTextEditor({ value, onChange, label, minHeight = '240px' }: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, []);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    ref.current?.focus();
    onChange(ref.current?.innerHTML || '');
  };

  const handleInput = () => onChange(ref.current?.innerHTML || '');

  return (
    <div className="space-y-2">
      {label && <label className="text-body-sm font-medium text-text-primary">{label}</label>}
      <div className="rounded-card border border-gray-200 overflow-hidden bg-white shadow-soft">
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-100 bg-gray-50/80">
          {[
            { icon: Bold, cmd: 'bold' },
            { icon: Italic, cmd: 'italic' },
            { icon: Heading2, cmd: 'formatBlock', val: 'h2' },
            { icon: List, cmd: 'insertUnorderedList' },
          ].map(({ icon: Icon, cmd, val }) => (
            <button
              key={cmd + (val || '')}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec(cmd, val)}
              className="p-2 rounded-lg hover:bg-white text-text-muted hover:text-text-primary transition-colors"
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              const url = prompt('Enter URL');
              if (url) exec('createLink', url);
            }}
            className="p-2 rounded-lg hover:bg-white text-text-muted hover:text-text-primary transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>
        <div
          ref={ref}
          contentEditable
          onInput={handleInput}
          className={cn('p-4 text-body-md text-text-primary outline-none prose-sm max-w-none', 'min-h-[200px]')}
          style={{ minHeight }}
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
}
