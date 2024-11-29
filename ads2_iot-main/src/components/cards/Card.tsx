import React from "react";

interface CardProps {
    header?: string;
    footer?: string;
    bgcolor?: string;
    children?: React.ReactNode;
    body?: string;
}

export default function Card({header, footer, bgcolor='bg-gray-300', children, body}:CardProps) {
    return (
        <div className={`card ${bgcolor}`}>
            {header && <div className="card-header">{header}</div>}
            <div className="card-body">
                {body ? (
                    <div dangerouslySetInnerHTML={{__html: body}} />
                ) : (
                    children
                )}
            </div>
            {footer && <div className="card-footer">{footer}</div>}
          </div>
    );
}