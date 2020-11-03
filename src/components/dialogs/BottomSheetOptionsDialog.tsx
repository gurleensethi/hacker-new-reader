import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  onOptionClicked: (key: string) => void;
}

const BottomSheetOptionsDialog: React.FC<Props> = ({
  isOpen,
  className,
  onClose,
  options,
  onOptionClicked,
}) => {
  const [isClosing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleDialogClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent the click from going to dialog root
    e.stopPropagation();
    e.preventDefault();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <div className="dialog" onClick={handleDialogClose}>
        <div
          className={`dialog__content  dialog__content--${
            isClosing ? "exiting" : "entering"
          }`}
          onClick={handleContentClick}
        >
          <div className="options">
            {options.map((option) => {
              return (
                <button
                  className="options__item"
                  key={option.key}
                  onClick={() => onOptionClicked(option.key)}
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
        </div>
      </div>
    </div>
  );
};

const component = styled(BottomSheetOptionsDialog)`
  .dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .dialog__content {
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 50%;
    overflow-y: scroll;
  }

  .dialog__content--entering {
    animation: enterAnimation 0.3s forwards;
  }

  .dialog__content--exiting {
    animation: exitAnimation 0.3s forwards;
  }

  .options__item {
    display: flex;
    align-items: center;
    padding: 16px;
    background: none;
    border: none;
    font-size: 20px;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #e1e1e1;
  }

  .options__item__icon {
    margin-right: 16px;
    opacity: 0.5;
  }

  .options__item__name {
  }

  @keyframes enterAnimation {
    from {
      bottom: -50%;
    }

    to {
      bottom: 0;
    }
  }

  @keyframes exitAnimation {
    from {
      bottom: 0;
    }

    to {
      bottom: -50%;
    }
  }
`;

export default component;
