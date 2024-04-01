import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { checkboxItems } from "@/config/checkboxItems";

type Props = {
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
};

type FormValues = {
  items: string[];
};

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function InputCheckbox({ setSelectedItems }: Props) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["one", "three"],
    },
  });

  const onSubmit = (data: FormValues) => {
    setSelectedItems(data.items); // Update selected items state
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const handleCheckboxChange = (itemId: string) => {
    const selectedItem = checkboxItems.find((item) => item.id === itemId);
    if (!selectedItem) return;

    const selectedItemLabel = selectedItem.label;

    if (checkedItems.includes(selectedItemLabel)) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== selectedItemLabel)
      );
    } else {
      setCheckedItems([...checkedItems, selectedItemLabel]);
    }

    setSelectedItems((prevSelectedItems) => {
      if (checkedItems.includes(selectedItemLabel)) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem !== selectedItemLabel
        );
      } else {
        return [...prevSelectedItems, selectedItemLabel];
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 bg-neutral-800 p-10"
      >
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="flex flex-col items-center mb-12">
                <FormLabel className="md:text-4xl text-3xl text-cyan-500 font-bold">
                  Checkboxes
                </FormLabel>
                <FormDescription className="text-cyan-500 md:text-2xl text-lg">
                  Select the way you want your answer to be framed.
                </FormDescription>
              </div>
              <div className="flex flex-col md:flex-row items-center md:justify-around space-y-4">
                {checkboxItems.map((item) => (
                  <FormItem
                    key={item.id}
                    className="items-center file:space-x-3 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FormControl>
                      <Checkbox
                        checked={checkedItems.includes(item.label)}
                        onCheckedChange={() => handleCheckboxChange(item.id)}
                      />
                    </FormControl>
                    <FormLabel className="tracking-tight font-sans text-cyan-500 md:text-xl text-lg font-bold cursor-pointer space-y-9 px-4">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
