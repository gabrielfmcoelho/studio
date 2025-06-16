import { cn } from '@/lib/utils';

interface CustomizableFeatureSectionProps<T> {
  /** A unique identifier for the section element */
  id: string;
  sectionBgClass?: string; // e.g., 'bg-background' or 'bg-section-alternate-background'
  /** The first part of the main title */
  titleStart: string;
  /** The highlighted part of the title (will be colored with the primary theme color) */
  titleHighlight: string;
  /** An optional last part of the title */
  titleEnd?: string;
  /** The subtitle or descriptive paragraph for the section */
  subtitle: string;
  /** An array of data items to be rendered in the grid */
  items: T[];
  /** Tailwind CSS classes to configure the grid layout (e.g., 'grid-cols-1 md:grid-cols-4') */
  gridConfig: string;
  /** A render prop function that takes an item and its index and returns a React node to render */
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function CustomizableFeatureSection<T>({
  id,
  sectionBgClass = 'bg-background',
  titleStart,
  titleHighlight,
  titleEnd = '',
  subtitle,
  items,
  gridConfig,
  renderItem,
}: CustomizableFeatureSectionProps<T>) {
  return (
    <section id={id} className={cn("py-16 md:py-24 bg-background dark:bg-gray-900 text-foreground dark:text-gray-100", sectionBgClass)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Main title with a highlighted part */}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {titleStart}{' '}
            <span className="text-primary dark:text-blue-400">{titleHighlight}</span>
            {' '}{titleEnd}
          </h2>
          {/* Subtitle */}
          <p className="mt-4 text-lg text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        {/* Responsive grid for the feature items */}
        <div className={`grid ${gridConfig} gap-8`}>
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </section>
  );
}