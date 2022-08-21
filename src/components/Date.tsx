import { format, formatISO } from "date-fns";

type Props = {
  date: Date;
};
export default function Date({ date }: Props) {
  return (
    <time dateTime={formatISO(date)}>
      <span>{format(date, "LLLL d, yyyy")}</span>
      <style jsx>
        {`
          span {
              font-family: 'Ubuntu', 'Segoe UI', Candara, 'Bitstream Vera Sans',
    'DejaVu Sans', 'Bitstream Vera Sans', 'Trebuchet MS', Verdana, 'Verdana Ref',
    sans-serif;
            color: #9f9797;
            font-size: 85%;
            letter-spacing: 2px;
          }
        `}
      </style>
    </time>
  );
}
