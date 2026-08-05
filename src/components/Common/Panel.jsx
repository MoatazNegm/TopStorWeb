import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Panel = ({
  icon,
  title,
  subtitle,
  actions,
  footer,
  bodyClass = 'p-5',
  collapsible = false,
  defaultOpen = true,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (collapsible) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <section className={`overflow-hidden rounded-lg border border-border bg-surface shadow-sm ${className}`}>
      <div
        className={`flex items-center justify-between gap-4 border-b border-border px-5 py-4 ${
          collapsible ? 'cursor-pointer hover:bg-gray-50/60 transition-colors' : ''
        }`}
        onClick={handleToggle}
      >
        <div className="flex items-center gap-3">
          {collapsible && (
            <ChevronDown
              size={18}
              className={`text-gray-400 transition-transform ${isOpen ? '' : '-rotate-90'}`}
            />
          )}
          {icon && (
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-600">
              {icon}
            </span>
          )}
          <div>
            <h3 className="text-base font-semibold text-gray-800">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        </div>
        {actions && <div onClick={(event) => event.stopPropagation()}>{actions}</div>}
      </div>

      {(!collapsible || isOpen) && <div className={bodyClass}>{children}</div>}
      {(!collapsible || isOpen) && footer && <div className="border-t border-border bg-surface-muted px-5 py-4">{footer}</div>}
    </section>
  );
};

export default Panel;
