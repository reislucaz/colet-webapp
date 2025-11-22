import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UseFormReturn } from 'react-hook-form'

interface ImageUploadProps {
  form: UseFormReturn<any>
  fieldName: string
}

export function ImageUpload({ form, fieldName }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = form.getValues(fieldName) || []
      const newFiles = [...currentFiles, ...acceptedFiles]
      form.setValue(fieldName, newFiles, { shouldValidate: true })

      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file))
      setPreviews((prev) => [...prev, ...newPreviews])
    },
    [form, fieldName],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
  })

  const removeFile = (index: number) => {
    const currentFiles = form.getValues(fieldName)
    const newFiles = currentFiles.filter((_: any, i: number) => i !== index)
    form.setValue(fieldName, newFiles, { shouldValidate: true })

    const newPreviews = previews.filter((_: any, i: number) => i !== index)
    setPreviews(newPreviews)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/30 bg-background'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte as imagens aqui...</p>
        ) : (
          <p>
            Arraste e solte algumas imagens aqui, ou clique para selecionar os
            arquivos
          </p>
        )}
      </div>
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((src, index) => (
            <div key={index} className="relative">
              <Image
                src={src}
                alt={`Preview ${index}`}
                width={200}
                height={200}
                className="h-40 w-full rounded-md object-cover"
                onLoad={() => URL.revokeObjectURL(src)}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6"
                onClick={() => removeFile(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
