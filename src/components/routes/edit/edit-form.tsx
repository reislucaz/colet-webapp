'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEditFormConstant } from "../../../hooks/use-edit-form-constant";
import { FormRender } from "../../../shared/form/form-field-dynamic/FormRender";
import { editProductSchema } from "../../../validations/edit-product-schema";

export function EditForm() {
  const methods = useForm({
    resolver: zodResolver(editProductSchema)
  })
  const { EDIT_FORM_CONSTANT } = useEditFormConstant()
  return <FormRender constant={EDIT_FORM_CONSTANT} form={methods} />
}