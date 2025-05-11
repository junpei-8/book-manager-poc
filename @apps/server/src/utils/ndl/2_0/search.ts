import { XMLParser } from 'fast-xml-parser';

/**
 * 基本的な文字列型の型。
 */
export interface NDLOpenSearchItemTextValueV2_0 {
  '#text': string;
}

/**
 * 国立国会図書館サーチ API の単一の項目の型。
 */
export type NDLOpenSearchSingleItemV2_0<T> = T;

/**
 * 国立国会図書館サーチ API の複数の項目の型。
 */
export type NDLOpenSearchMultipleItemV2_0<T> = T | T[];

/** @ignore */
type TextValue = NDLOpenSearchItemTextValueV2_0;
/** @ignore */
type Single<T> = NDLOpenSearchSingleItemV2_0<T>;
/** @ignore */
type Multiple<T> = NDLOpenSearchMultipleItemV2_0<T>;

/**
 * 国立国会図書館 OpenSearch API（v2.0）に渡す検索パラメータ。\
 * 各項目は AND 条件で結合され、同一項目内では一部が OR 条件になる場合がある。
 *
 * @see {@link https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_20250326.pdf | Document (PDF) / 12 page}
 */
export interface NDLOpenSearchParamsV2_0 {
  /**
   * データプロバイダID（例: iss-ndl-opac, aozoraなど）。\
   * 複数指定は空白区切りで OR 条件となる。\
   * 単独指定は不可。
   */
  dpid?: string;

  /**
   * データプロバイダグループID。\
   * 1つのみ指定できる。
   */
  dpgroupid?: string;

  /**
   * 全項目を対象に横断的に検索するキーワード。\
   * 空白区切りで AND 条件となる。
   */
  any?: string;

  /**
   * タイトル（書名、巻号、シリーズ名など）を部分一致で検索する。
   */
  title?: string;

  /**
   * 著者、編者、訳者などの作成者名を部分一致で検索する。
   */
  creator?: string;

  /**
   * 出版社、団体、個人などの出版者名を部分一致で検索する。
   */
  publisher?: string;

  /**
   * デジタル化を行った製作者名を部分一致で検索する。
   */
  digitized_publisher?: string;

  /**
   * 分類記号（NDCやNDLC）を前方一致で検索する。\
   * 複数指定不可。
   */
  ndc?: string;

  /**
   * 出版年月日の開始値。形式は `YYYY`, `YYYY-MM`, `YYYY-MM-DD` のいずれか。\
   * until と同形式であること。
   */
  from?: string;

  /**
   * 出版年月日の終了値。\
   * 形式は `from` と揃える必要がある。
   */
  until?: string;

  /**
   * 出力件数（最大500）。\
   * 省略時は200。
   */
  cnt?: number;

  /**
   * ページング用の開始インデックス（省略時は1）。
   */
  idx?: number;

  /**
   * ISBN または ISSN。10/13桁の場合は完全一致。\
   * それ以外の桁は前方一致
   */
  isbn?: string;

  /**
   * メディア種別。\
   * 空白区切りで複数指定可能。\
   * OR条件で検索される。
   */
  mediatype?: string;
}

/**
 * 国立国会図書館サーチ API レスポンス。 (DC-NDL Simple ver.2.0準拠)
 */
export interface NDLOpenSearchResponseV2_0 {
  rss: {
    channel: NDLOpenSearchResultV2_0;
  };
}

/**
 * 国立国会図書館サーチ API レスポンスのリザルト・チャンネル。(DC-NDL Simple ver.2.0準拠)
 */
export interface NDLOpenSearchResultV2_0 {
  title: Multiple<TextValue>;
  link: Multiple<TextValue>;
  description?: Multiple<TextValue>;
  language?: Multiple<TextValue>;
  'openSearch:totalResults': Single<TextValue>;
  'openSearch:startIndex': Single<TextValue>;
  'openSearch:itemsPerPage': Single<TextValue>;
  item?: Multiple<NDLOpenSearchItemV2_0>;
}

/**
 * 国立国会図書館サーチ API レスポンスの情報。（DC-NDL Simple ver.2.0準拠）
 *
 * @see {@link https://ndlsearch.ndl.go.jp/file/renkei/dcndl/dcndl_simple_format_ver.2.0_20210104.pdf | Document (PDF)}
 */
export interface NDLOpenSearchItemV2_0 {
  /* eslint-disable jsdoc/multiline-blocks */

  // #########################
  // ## 国立国会図書館固有の項目 ##
  // #########################

  /** タイトル */
  title: Multiple<TextValue>;
  /** リンク */
  link: Multiple<TextValue>;
  /** 説明 */
  description?: Multiple<TextValue>;
  /** 著者 */
  author?: Multiple<TextValue>;
  /** カテゴリ */
  category?: Multiple<TextValue>;
  /** 出版日 */
  pubDate?: Multiple<TextValue>;
  /** ガイド */
  guid?: Multiple<
    TextValue & {
      '@isPermaLink': 'true' | 'false';
    }
  >;

  // ###########################
  // ## データプロバイダ固有の項目 ##
  // ###########################

  /** タイトル */
  'dc:title': Multiple<TextValue>;
  /** タイトルよみ */
  'dcndl:titleTranscription'?: Multiple<TextValue>;
  /** 別タイトル */
  'dcterms:alternative'?: Single<TextValue>;
  /** 別タイトルよみ */
  'dcndl:alternativeTranscription'?: Single<TextValue>;
  /** 巻次・部編番号 */
  'dcndl:volume'?: Single<TextValue>;
  /** 巻次・部編番号よみ */
  'dcndl:volumeTranscription'?: Single<TextValue>;
  /** 部編名 */
  'dcndl:volumeTitle'?: Single<TextValue>;
  /** 部編名よみ */
  'dcndl:volumeTitleTranscription'?: Single<TextValue>;
  /** シリーズタイトル */
  'dcndl:seriesTitle'?: Single<TextValue>;
  /** シリーズタイトルよみ */
  'dcndl:seriesTitleTranscription'?: Single<TextValue>;
  /** 内容細目 */
  'dcndl:partTitle'?: Multiple<TextValue>;
  /** 内容細目よみ */
  'dcndl:partTitleTranscription'?: Multiple<TextValue>;
  /** 著者 */
  'dc:creator'?: Multiple<TextValue>;
  /** 著者よみ */
  'dcndl:creatorTranscription'?: Multiple<TextValue>;
  /** シリーズ著者 */
  'dcndl:seriesCreator'?: Multiple<TextValue>;
  /** 内容細目著者 */
  'dcndl:partCreator'?: Multiple<TextValue>;
  /** 版表示 */
  'dcndl:edition'?: Multiple<TextValue>;
  /** 出版者 */
  'dc:publisher'?: Multiple<TextValue>;

  /**
   * 出版地。NDLサーチからの提供データでのみ使用する。 ISO3166形式の国名コードを含む場合がある。
   */
  'dcndl:publicationPlace'?: Multiple<
    TextValue & {
      '@xsi:type'?: 'dcterms:ISO3166';
    }
  >;

  /** 出版年月日等 */
  'dc:date'?: Multiple<TextValue>;

  /** 出版年月日 (W3C Date and Time Formats形式) */
  'dcterms:issued'?: Multiple<
    TextValue & {
      '@xsi:type': 'dcterms:W3CDTF';
    }
  >;

  /** デジタル化した製作者 */
  'dcndl:digitizedPublisher'?: Single<TextValue>;

  /** デジタル化した日 (W3C Date and Time Formats形式) */
  'dcndl:dateDigitized'?: Single<
    TextValue & {
      '@xsi:type': 'dcterms:W3CDTF';
    }
  >;

  /** 分類記号。 */
  'dc:subject'?: Multiple<
    TextValue & {
      /**
       * - dcndl:NDLSH ... 国立国会図書館件名標目表
       * - dcndl:NDLC ... 国立国会図書館分類表
       * - dcndl:NDC10 ... 日本十進分類法第10版
       * - dcndl:NDC9 ... 日本十進分類法第9版
       * - dcndl:NDC8 ... 日本十進分類法第8版
       * - dcndl:NDC ... その他のNDC
       * - dcterms:DDC ... デューイ十進分類法
       * - dcterms:UDC ... 国際十進分類法
       * - dcterms:LCC ... 米国議会図書館分類法
       * - dcndl:GHQSCAP ... GHQSCAP
       * - dcndl:USCAR ... USCAR
       * - dcndl:MCJ ... マイクロコード日本
       */
      '@xsi:type'?:
        | 'dcndl:NDLSH'
        | 'dcndl:NDLC'
        | 'dcndl:NDC10'
        | 'dcndl:NDC9'
        | 'dcndl:NDC8'
        | 'dcndl:NDC'
        | 'dcterms:DDC'
        | 'dcterms:UDC'
        | 'dcterms:LCC'
        | 'dcndl:GHQSCAP'
        | 'dcndl:USCAR'
        | 'dcndl:MCJ';
    }
  >;

  /** 言語（ISO639-2形式） */
  'dc:language'?: Multiple<
    TextValue & {
      '@xsi:type': 'dcterms:ISO639-2';
    }
  >;

  /** 注記 */
  'dcterms:description'?: Multiple<TextValue>;
  /** 要約・抄録 */
  'dcterms:abstract'?: Single<TextValue>;
  /** 目次 */
  'dcterms:tableOfContents'?: Multiple<TextValue>;
  /** 記録形式（IMT形式） */
  'dcterms:format'?: Multiple<
    TextValue & {
      '@xsi:type': 'dcterms:IMT';
    }
  >;
  /** 形態に関する情報 */
  'dcterms:extent'?: Multiple<TextValue>;

  /** 資料種別。 NDLタイプ語彙の日本語表示名から値を選択する。 */
  'dcndl:materialType'?: Multiple<TextValue>;
  /** 価格 */
  'dcndl:price'?: Multiple<TextValue>;

  /** 識別子。 */
  'dc:identifier'?: Multiple<
    TextValue & {
      /**
       * - dcndl:JPNO ... 日本全国書誌番号
       * - dcndl:NDLBibID ... 国立国会図書館書誌ID
       * - dcndl:NDLJP ... 国立国会図書館で付与した永続的識別子
       * - dcndl:USMARCNO ... USMARC番号
       * - dcndl:OCLCNO ... OCLC番号
       * - dcndl:UKMARCNO ... UKMARC番号
       * - dcndl:TRCMARCNO ... TRCMARC番号
       * - dcndl:GPOBibNO ... GPO番号
       * - dcndl:BRNO ... 点字図書・録音図書全国総合目録番号
       * - dcndl:RLINNO ... RLIN番号
       * - dcndl:NSMARCNO ... NS-MARC番号
       * - dcndl:OPLMARCNO ... OPL-MARC番号
       * - dcndl:KNMARCNO ... 紀伊国屋マーク番号
       * - dcndl:NIIBibID ... NACSIS-CATレコードID
       * - dcndl:TOHANMARCNO ... トーハンMARC番号
       * - dcndl:ISBN ... ISBN
       * - dcndl:SetISBN ... セットISBN
       * - dcndl:ISSN ... ISSN
       * - dcndl:ISSNL ... ISSN-L
       * - dcndl:ErrorISBN ... ISBN（エラーコード）
       * - dcndl:IncorrectISSN ... ISSN（エラーコード）
       * - dcndl:IncorrectISSNL ... ISSN-L（エラーコード）
       * - dcndl:CODEN ... CODEN
       * - dcndl:ISRN ... ISRN
       * - dcndl:ISMN ... ISMN
       * - dcndl:PBNO ... 出版者番号
       * - dcndl:PLNO ... プレート番号（楽譜）
       * - dcndl:RIS502 ... 発売番号（録音・映像番号）
       * - dcndl:GPOCN ... GPO管理番号
       * - dcndl:SUPTDOC ... SUPTDOC番号
       * - dcndl:KAKENHINO ... 科研費課題番号
       * - dcndl:UNDS ... 国連ドキュメント番号
       * - dcndl:UNSN ... 国連セールス番号
       * - dcndl:StandardNO ... 規格番号
       * - dcndl:TRNO ... テクニカルリポート番号
       * - dcndl:SICI ... SICI
       * - dcndl:DOI ... DOI
       * - dcterms:URI ... 国立国会図書館サーチの書誌詳細画面URL
       */
      '@xsi:type':
        | 'dcndl:JPNO'
        | 'dcndl:NDLBibID'
        | 'dcndl:NDLJP'
        | 'dcndl:USMARCNO'
        | 'dcndl:OCLCNO'
        | 'dcndl:UKMARCNO'
        | 'dcndl:TRCMARCNO'
        | 'dcndl:GPOBibNO'
        | 'dcndl:BRNO'
        | 'dcndl:RLINNO'
        | 'dcndl:NSMARCNO'
        | 'dcndl:OPLMARCNO'
        | 'dcndl:KNMARCNO'
        | 'dcndl:NIIBibID'
        | 'dcndl:TOHANMARCNO'
        | 'dcndl:ISBN'
        | 'dcndl:SetISBN'
        | 'dcndl:ISSN'
        | 'dcndl:ISSNL'
        | 'dcndl:ErrorISBN'
        | 'dcndl:IncorrectISSN'
        | 'dcndl:IncorrectISSNL'
        | 'dcndl:CODEN'
        | 'dcndl:ISRN'
        | 'dcndl:ISMN'
        | 'dcndl:PBNO'
        | 'dcndl:PLNO'
        | 'dcndl:RIS502'
        | 'dcndl:GPOCN'
        | 'dcndl:SUPTDOC'
        | 'dcndl:KAKENHINO'
        | 'dcndl:UNDS'
        | 'dcndl:UNSN'
        | 'dcndl:StandardNO'
        | 'dcndl:TRNO'
        | 'dcndl:SICI'
        | 'dcndl:DOI'
        | 'dcterms:URI';
    }
  >;

  /** 原資料の識別子（国立国会図書館 書誌ID） */
  'dcndl:sourceIdentifier'?: Multiple<
    TextValue & {
      '@xsi:type': 'dcndl:NDLBibID';
    }
  >;

  /** 改題後誌に関する情報 */
  'dcterms:isReplacedBy'?: Multiple<{
    '@rdf:resource': string;
    '@rdfs:label': string;
  }>;

  /** 提供元書誌詳細画面のURL、または IIIF マニフェスト URI。 */
  'rdfs:seeAlso'?: Multiple<{
    '@rdf:resource': string;
    '@rdf:type'?: 'http://iiif.io/api/presentation/2#Manifest';
  }>;

  /** 一次資料へのリンクURL */
  'owl:sameAs'?: Multiple<{ '@rdf:resource': string }>;

  /** 資料のサムネイル画像URL */
  'foaf:thumbnail'?: Multiple<{ '@rdf:resource': string }>;

  /**
   * 地理的範囲に関する情報。データ型指定のないデータが存在する場合がある。
   */
  'dcterms:spatial'?: Multiple<
    TextValue & {
      /**
       * - dcndl:UTMNO ... UTM区画番号
       * - dcndl:JISX0402 ... 全国地方公共団体コード
       * - dcndl:ICNO ... 国際海図番号
       * - dcndl:NCNO ... 各国国内海図番号
       */
      '@xsi:type':
        | 'dcndl:UTMNO'
        | 'dcndl:JISX0402'
        | 'dcndl:ICNO'
        | 'dcndl:NCNO';
    }
  >;

  /**
   * 時間的範囲に関する情報。データ型指定のないデータが存在する場合がある。
   */
  'dcterms:temporal'?: Multiple<
    TextValue & {
      /**
       * - dcterms:W3CDTF ... W3C Date and Time Formats
       * - dcterms:Period ... Period 形式
       */
      '@xsi:type': 'dcterms:W3CDTF' | 'dcterms:Period';
    }
  >;

  /** 掲載誌名 */
  'dcndl:publicationName'?: Single<TextValue>;
  /** 掲載巻 */
  'dcndl:publicationVolume'?: Single<TextValue>;
  /** 掲載号 */
  'dcndl:number'?: Single<TextValue>;
  /** 掲載通号 */
  'dcndl:issue'?: Single<TextValue>;
  /** 掲載ページ */
  'dcndl:pageRange'?: Single<TextValue>;

  /** アクセス制限 - 国立国会図書館デジタル化資料等のアクセス制限のため国立国会図書館でのみ使用 */
  'dcterms:accessRights'?: Multiple<TextValue>;
  /** 著作権に関する情報 */
  'dcterms:rights'?: Multiple<TextValue>;
  /** 著作者情報 */
  'dcterms:rightsHolder'?: Multiple<TextValue>;

  /* eslint-enable jsdoc/multiline-blocks */
}

/**
 * 国立国会図書館の検索 API を使用する。
 *
 * @param   params 検索パラメータ。
 *
 * @returns        検索結果。（総件数と本などの情報の配列）
 *
 * @see {@link https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_20250326.pdf | Document (PDF) / 12 page}
 */
export async function fetchNDLOpenSearchV2_0(params: NDLOpenSearchParamsV2_0) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') query.set(key, value.toString());
  }

  const NDL_API_ENDPOINT = 'https://iss.ndl.go.jp/api/opensearch';
  const url = `${NDL_API_ENDPOINT}?${query.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const xmlText = await response.text();
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@',
    alwaysCreateTextNode: true,
    parseTagValue: false,
    parseAttributeValue: false,
  });

  const parsed = parser.parse(xmlText) as NDLOpenSearchResponseV2_0;
  const channel = parsed?.rss?.channel;
  if (!channel) {
    throw new Error('Invalid response');
  }

  return channel;
}
