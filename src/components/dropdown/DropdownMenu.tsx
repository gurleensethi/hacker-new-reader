import React, { useRef, useState } from "react";
import styled from "styled-components";
import useClickAway from "../../hooks/useClickAway";

type ALIGNMENT = "left" | "right";

interface Option {
  name: string;
  key: string;
  iconUrl: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  options: Option[];
  onOptionClick: (key: string) => void;
  icon: () => React.ReactElement;
  alignment?: ALIGNMENT;
}

const DropdownMenu: React.FC<Props> = ({
  className,
  isOpen,
  options,
  onOptionClick,
  onClose,
  icon,
}) => {
  const [isClosing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  function handleClickAway() {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  }

  useClickAway(rootRef, handleClickAway, isOpen);

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onOptionClick(key);
  };

  return (
    <div className={className} ref={rootRef}>
      {icon()}
      {isOpen && (
        <div
          className={`options options--${isClosing ? "exiting" : "entering"}`}
          style={{ top: rootRef.current?.offsetHeight }}
        >
          {options.map((option) => {
            return (
              <button
                className="options__item"
                key={option.key}
                onClick={(e) => handleOptionClick(e, option.key)}
              >
                <img
                  className="options__item__icon"
                  src={option.iconUrl}
                  alt="option"
                />
                <span className="options__item__name">{option.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default styled(DropdownMenu)`
  position: relative;
  z-index: 999;

  .options {
    position: absolute;
    white-space: nowrap;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgb(230, 230, 230),
      -4px 4px 10px rgb(230, 230, 230), 4px 4px 10px rgb(230, 230, 230);
    background-color: white;
    overflow: hidden;
    ${(props) => props.alignment && `${props.alignment}: 0px`}
  }

  .options--entering {
    animation: enterAnimation 0.3s;
  }

  .options--exiting {
    animation: exitAnimation 0.3s;
  }

  .options__item {
    background: none;
    border: none;
    display: flex;
    padding: 16px;
    transition: 0.3s;
  }

  .options__item:hover {
    cursor: pointer;
    background-color: #ebebeb;
  }

  .options__item__icon {
    height: 20px;
    margin-right: 8px;
  }

  .options__item__name {
    font-size: 18px;
  }

  @keyframes enterAnimation {
    from {
      opacity: 0;
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      transform: translateY(0px);
    }
  }

  @keyframes exitAnimation {
    from {
      opacity: 1;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      transform: translateY(0px);
    }

    to {
      opacity: 0;
      border-bottom-left-radius: 100%;
      border-bottom-right-radius: 100%;
      transform: translateY(-10px);
    }
  }
`;
