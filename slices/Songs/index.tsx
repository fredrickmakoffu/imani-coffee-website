import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Songs`.
 */
export type SongsProps = SliceComponentProps<Content.SongsSlice>;

/**
 * Component for "Songs" Slices.
 */
const Songs = ({ slice }: SongsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for songs (variation: {slice.variation}) Slices
    </section>
  );
};

export default Songs;
