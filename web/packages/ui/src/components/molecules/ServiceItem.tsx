import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";

export function ServiceItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-t border-line pt-4">
      <Heading as="h3" size="md">{title}</Heading>
      <Text size="sm" tone="muted" className="mt-1">{description}</Text>
    </div>
  );
}
