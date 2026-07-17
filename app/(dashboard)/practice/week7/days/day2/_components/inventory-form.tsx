'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  inventorySchema,
  InventoryValues,
} from '@/schemas/inventory-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { createInventory, updateInventory } from '../actions';
import { toast } from 'sonner';
import { Inventory } from '@/db/schema';

interface InventoryFormProps {
  initialData?: Inventory;
  onSuccess?: () => void;
}

const InventoryForm = ({
  initialData,
  onSuccess,
}: InventoryFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InventoryValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: initialData
      ? {
          itemName: initialData.itemName,
          category: initialData.category,
          quantity: initialData.quantity,
          price: Number(initialData.price),
          inStock: initialData.inStock,
        }
      : {
          category: '' as InventoryValues['category'],
        },
  });

  const onSubmit = async (data: InventoryValues) => {
    try {
      const res = initialData
        ? await updateInventory(initialData.id, data)
        : await createInventory(data);
      const errors = res.errors;
      console.log('errors:', errors);

      if (errors) {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as keyof InventoryValues, {
            message: value[0],
          });
        });
        return toast.error(
          `${initialData ? 'Updata failed' : 'Create failed'}`
        );
      }
      toast.success(
        `${initialData ? 'Update successful' : 'Create successful'}`
      );
      if (initialData) onSuccess?.();
      reset();
      return router.refresh();
    } catch (error) {
      console.log('error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {/* ItemName */}
      <div className="flex">
        <h3 className="w-28">Name:</h3>
        <Input {...register('itemName')} />
      </div>
      <p className="text-red-500 text-center">
        {errors.itemName?.message}
      </p>
      {/* category */}
      <div className="flex">
        <h3 className="w-25">Category:</h3>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Set category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Electronics">
                    Electronics
                  </SelectItem>
                  <SelectItem value="Furniture">Furniture</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <p className="text-red-500 text-center">
        {errors.category?.message}
      </p>
      {/* quantity */}
      <div className="flex">
        <h3 className="w-28">Quantity:</h3>
        <Input
          {...register('quantity', { valueAsNumber: true })}
          type="number"
        />
      </div>
      <p className="text-red-500 text-center">
        {errors.quantity?.message}
      </p>
      {/* Price */}
      <div className="flex">
        <h3 className="w-28">Price:</h3>
        <Input
          {...register('price', { valueAsNumber: true })}
          type="number"
          step="0.01"
        />
      </div>
      <p className="text-red-500 text-center">
        {errors.price?.message}
      </p>
      {/* inStock */}
      <div className="flex">
        <h3 className="w-28">InStock:</h3>
        <Input {...register('inStock')} type="checkbox" />
      </div>
      <p className="text-red-500 text-center">
        {errors.inStock?.message}
      </p>

      {initialData ? (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          Update
        </Button>
      ) : (
        <div className="flex justify-center gap-2">
          <Button type="submit" disabled={isSubmitting} className="">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            variant="outline"
          >
            Reset
          </Button>
        </div>
      )}
    </form>
  );
};

export default InventoryForm;
