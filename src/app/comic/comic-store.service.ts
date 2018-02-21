import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DexieService } from '../dexie.service';
import { Comic, Page, Chapter, Volume } from './comic';

export interface ComicListData {
    comicurl: string;
    comicid: number;
    accountid: number;
    title: string;
    description: string;
    thumbnailurl: string;
};

export interface ComicData {
    comicurl: string;
    comicid: number;
    accountid: number;
    title: string;
    description: string;
    thumbnailurl: string;

    pages: Array<{
        pageid: number
        pagenumber: number
        chapterid: number
        imgurl: string
        alttext: string
    }>;

    chapters: Array<{
        chapterid: number
        volumeid: number
        chapternumber: number
    }>;

    volumes: Array<{ volumeid: number
        volumenumber: number
    }>;
};

@Injectable()
export class ComicStoreService {

    constructor(
        private dexieService: DexieService,
    ) { }

    unpackComicListItem(entry: ComicListData) {
        return new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl
        );
    }

    packComicListItem(comic: Comic): ComicListData {
        return {
            comicurl: comic.comicURL,
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL
        };
    }

    storeComicList(comics: Comic[], loc: string) {
        let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
        comicListTable.bulkPut(comics.map(this.packComicListItem));
    }

    unstoreComicList(loc: string) {
        let comicListTable: Dexie.Table<ComicListData, string> = this.dexieService.table(loc);
        return new Promise((resolve, reject) => {
            comicListTable.toArray().then((data: ComicListData[]) => {
                resolve(data.map(this.unpackComicListItem));
            }).catch((e) => {
                console.error(e);
                reject([]);
            });
        });
    }


    unpackComic(entry: ComicData) {
        let chapters: Chapter[] = [];
        let volumes: Volume[] = [];
        let pages: Page[] = [];
        for (let chapter of entry.chapters) {
            let c: Chapter = new Chapter(
                chapter.chapterid,
                chapter.volumeid,
                chapter.chapternumber,
            );
            chapters.push(c);
        }

        for (let volume of entry.volumes) {
            let v: Volume = new Volume(
                volume.volumeid,
                volume.volumenumber,
            );
            volumes.push(v);
        }

        for (let page of entry.pages) {
            let p: Page = new Page(
                page.pageid,
                page.pagenumber,
                page.chapterid,
                page.imgurl,
                page.alttext
            );
            pages.push(p);
        }

        let comic = new Comic(
            entry.comicid,
            entry.accountid,
            entry.title,
            entry.comicurl,
            entry.description,
            entry.thumbnailurl,
            volumes,
            chapters,
            pages
        );

        return comic;
    }

    packComic(comic: Comic): ComicData {
        return {
            comicurl: comic.comicURL,
            comicid: comic.comicID,
            accountid: comic.accountID,
            title: comic.title,
            description: comic.description,
            thumbnailurl: comic.thumbnailURL,
            volumes: comic.volumes.map(volume => {
                return {
                    volumeid: volume.volumeID,
                    volumenumber: volume.volumeNumber
                };
            }),
            chapters: comic.chapters.map(chapter => {
                return {
                    chapterid: chapter.chapterID,
                    volumeid: chapter.volumeID,
                    chapternumber: chapter.chapterNumber
                };
            }),
            pages: comic.pages.map(page => {
                return {
                    pageid: page.pageID,
                    pagenumber: page.pageNumber,
                    chapterid: page.chapterID,
                    imgurl: page.imgURL,
                    alttext: page.altText
                };
            })
        };
    }

    cacheComic(data: ComicData) {
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        comicTable.put(data);
    }

    getCachedComic(comicURL: string): Promise<Comic> {
        let comicTable: Dexie.Table<ComicData, string> = this.dexieService.table('comics');
        return new Promise((resolve, reject) => {
            comicTable.get({ comicurl: comicURL }).then((data) => {
                resolve(this.unpackComic(data));
            }).catch((e) => {
                console.error(e);
                reject([]);
            });
        });
    }
}