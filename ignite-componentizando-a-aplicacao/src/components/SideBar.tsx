import { Button } from "./Button";

interface Genre {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface SideBarProps {
  list: Genre[];
  onChange: (value: number) => void;
  isSelected: number;
}

export function SideBar(props: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {props.list.map((genre) => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.onChange(genre.id)}
            selected={props.isSelected === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
