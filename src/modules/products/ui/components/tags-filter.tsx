interface Props {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: Props) => {
  return (
    <div>
      TagsFilter
    </div>
  )
}