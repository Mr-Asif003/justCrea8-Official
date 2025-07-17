import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const initialDocs = [
  {
    id: 1,
    title: 'Project Plan',
    category: 'Planning',
    fileType: 'pdf',
    fileUrl: '/docs/project-plan.pdf',
    uploadedBy: 'Asif Khan',
    uploadedAt: '2025-06-10',
  },
  {
    id: 2,
    title: 'Design Wireframe',
    category: 'UI/UX',
    fileType: 'image',
    fileUrl: '/docs/wireframe.png',
    uploadedBy: 'Priya Sharma',
    uploadedAt: '2025-06-11',
  },
];

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs);
  const [filter, setFilter] = useState('');
  const [filePreview, setFilePreview] = useState(null);

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id) => {
    setDocs(docs.filter((doc) => doc.id !== id));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      id: Date.now(),
      title: file.name,
      category: 'General',
      fileType: file.type.includes('image') ? 'image' : 'pdf',
      fileUrl: URL.createObjectURL(file),
      uploadedBy: 'You',
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    setDocs([newDoc, ...docs]);
  };

  return (
    <div className="px-6 md:px-12 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📄 Project Documents</h2>
        <Input type="file" onChange={handleFileUpload} className="max-w-xs" />
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search documents..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="rounded-xl border p-4 shadow-sm bg-white dark:bg-zinc-900 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {doc.category} • Uploaded by {doc.uploadedBy}
                </p>
              </div>
              <span
                className={cn(
                  'text-xs px-2 py-1 rounded-full font-medium',
                  doc.fileType === 'pdf'
                    ? 'bg-red-100 text-red-600 dark:bg-red-800/20'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-800/20'
                )}
              >
                {doc.fileType.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl h-[80vh]">
                  <h4 className="font-semibold mb-2">{doc.title}</h4>
                  {doc.fileType === 'pdf' ? (
                    <iframe
                      src={doc.fileUrl}
                      className="w-full h-full rounded border"
                      title={doc.title}
                    />
                  ) : (
                    <img
                      src={doc.fileUrl}
                      alt={doc.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </DialogContent>
              </Dialog>

              <a
                href={doc.fileUrl}
                download
                className="text-sm text-cyan-600 hover:underline"
              >
                Download
              </a>

              <Button
                size="sm"
                variant="ghost"
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDelete(doc.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No documents found.
        </div>
      )}
    </div>
  );
}
