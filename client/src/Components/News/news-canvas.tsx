// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import ReactLoading from 'react-loading';

import * as classes from "./news.css";
import { INewsData } from './news-provider';
import { getShortenedTimeAndDate } from './../../util/Helpers';
import { LocalizationContext } from './../LocalizationProvider';

// TODO: Remove hardcoded images
import satya_nadella from './../../images/satya_nadella.jpg'
import headspace from './../../images/headspace.png'

interface IContactsProps {
    newsData: INewsData[],
    isLoading: boolean;
}

const renderNews = (newsData: INewsData, key: number) => {
    return (
        <div className={classes.NewsContainer} key={key}>
            <div className={classes.ImageContainer}>
                <img src={newsData.title.indexOf("Executive") >= 0 ? satya_nadella : headspace} className={classes.Image} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
                <h2 className={classes.Title}>{newsData.title}</h2>
                <div>{getShortenedTimeAndDate(new Date(newsData.date))}</div>
                <div className={classes.Description}>{newsData.desc}</div>
            </div>
        </div>
    );
};

const News = (props: IContactsProps) => {
    const {
        newsData,
        isLoading
    } = props;

    const { getLocalizedString } = React.useContext(LocalizationContext);

    const news = [];
    for (let i = 0; i < newsData.length; i++) {
        news.push(renderNews(newsData[i], i));
    }

    return (
        <div className={classes.Container}>
            <h1 className={classes.Header}>{getLocalizedString("NEWS_HEADER")}</h1>
            {isLoading ? (
                <div className={classes.Loading}>
                    <ReactLoading type="bubbles" color="rgb(13, 103, 151)" height={60} width={60} />
                </div>
            ) : news}
        </div>  
    );
};

export default News;