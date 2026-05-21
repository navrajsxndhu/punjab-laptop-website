'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { adminApi } from '@/lib/admin-api';
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
  folder?: string;
  label?: string;
}

export function ImageUploader({ value, onChange, multiple = true, folder, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const toast = useToast();

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!list.length) return;

    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of list) {
        const res = await adminApi.uploadImage(file, folder);
        urls.push(res.data.url);
      }
      onChange(multiple ? [...value, ...urls] : urls.slice(0, 1));
      toast.success('Image uploaded');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
    },
    [value, multiple]
  );

  const remove = (url: string) => onChange(value.filter((u) => u !== url));

  return (
    <div className="space-y-3">
      {label && <label className="text-body-sm font-medium text-text-primary">{label}</label>}

      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          'relative border-2 border-dashed rounded-card p-8 text-center transition-all duration-300',
          dragOver ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/40 bg-gray-50/50'
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={uploading}
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
        />
        {uploading ? (
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
        ) : (
          <>
            <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-body-sm text-text-muted">Drag & drop or click to upload</p>
            <p className="text-caption text-text-muted/70 mt-1">PNG, JPG up to 5MB</p>
          </>
        )}
      </motion.div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {value.map((url) => (
            <div key={url} className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-100 group">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute top-1 right-1 p-1 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {!value.length && <ImageIcon className="w-6 h-6 text-gray-300" />}
        </div>
      )}
    </div>
  );
}
