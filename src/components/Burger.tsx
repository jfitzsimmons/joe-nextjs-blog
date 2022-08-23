type Props = {
  active: boolean;
  onClick: () => void;
};
export default function Burger({ active, onClick }: Props) {
  return (
    <div className={"container " + (active ? "active" : "")} onClick={onClick}>
      <div className={"meat meat-1"} />
      <div className={"meat meat-2"} />
      <div className={"meat meat-3"} />
      <style jsx>
        {`
          .container {
            position: fixed;
            width: 38px;
            height: 38px;
            cursor: pointer;
            top: 0;
            left: calc(50% - 19px);
            z-index: 4;
            background-color: rgba(11, 4, 6, 0.8);
            border-radius: 0 0 4vmin 4vmin;
            padding: 0.25em 0.75em;
            box-shadow: 20px -10px 40px 3px rgba(211, 184, 196, 0.2), inset 10px 10px 40px 0px rgba(11, 4, 6, 0.6);
          }
          .meat {
            position: absolute;
            width: 28px;
            height: 2px;
            background: #9f9797;
            top: calc(50% - 2px / 2);
            left: calc(50% - 28px / 2);
            transition: all 150ms ease-in;
          }
          .container:hover .meat{
            background: #e8dfdf;
            transition: all 150ms ease-in;
          }
          .container.active {
            background: rgba(253, 247, 247, 0.7);
            transition: all 150ms ease-in;
          }
          .container.active:hover {
            background: #e8dfdf;
            transition: all 150ms ease-in;
          }
          .container.active .meat {
            background: rgba(11, 4, 6, 0.8);
          }
          .meat-1 {
            transform: translateY(-10px);
          }
          .meat-2 {
            width: calc(28px - 6px);
          }
          .meat-3 {
            transform: translateY(10px);
          }
          .active .meat-1 {
            transform: rotate(45deg);
          }
          .active .meat-2 {
            opacity: 0;
          }
          .active .meat-3 {
            transform: rotate(-45deg);
          }

          @media (min-width: 769px) {
            .container {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
