// Component HomeCard

import React from 'react';
import { Link } from 'react-router-dom';

import './HomeCard.css';

type HomeCardProps = {
    title: string,
    body: string,
    linkText: string,
    link: string
}

export function HomeCard(props: HomeCardProps) {
    return (
        <div className="HomeCard">
                <div className="card-frame">
                    <div className="flex-top">
                        <div className="card-title">{props.title}</div>
                        <div className="card-body">{props.body}</div>
                    </div>

                        <div className="card-link">
                            <Link to={props.link}>
                            {props.linkText}
                            </Link>
                        </div>
                </div>
        </div>
    );
}