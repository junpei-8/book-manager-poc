# メイン機能のデータベース構成

## 概要

Book Manager のメイン機能のデータベースは、ユーザーのフレーズ（Phrase）と各種コレクションを管理するための構成となっています。各コレクションタイプ（本、記事など）は独立したテーブルとして管理され、Phrase との関連付けが可能です。

本アプリは初期段階では本に特化したアプリケーションとして開発を進めますが、将来的な拡張性を考慮し、本以外のコンテンツ（記事や動画など）も管理できる設計としています。フレーズ（Phrase）は各コンテンツから独立して管理できる柔軟な構造を採用しています。

<br />

## テーブル構成

### UserPhrases

ユーザーが作成したフレーズを管理するテーブル。

| カラム名                  | 型          | 説明                           | 必須 |
| ------------------------- | ----------- | ------------------------------ | ---- |
| `id`                      | `string`    | プライマリーキー               | ○    |
| `public_id`               | `string`    | 公開ID                         | ○    |
| `user_id`                 | `string`    | ユーザーID（外部キー）         | ○    |
| `user_book_collection_id` | `string`    | 本のコレクションID（外部キー） | ○    |
| `content`                 | `text`      | フレーズの内容                 | ○    |
| `page_number`             | `string`    | ページ数                       | ○    |
| `created_at`              | `timestamp` | 作成日時                       | ○    |
| `updated_at`              | `timestamp` | 更新日時                       |      |
| `deleted_at`              | `timestamp` | 削除日時                       |      |

| 制約タイプ | カラム                    | 参照先                   |
| ---------- | ------------------------- | ------------------------ |
| `PK`       | `id`                      | -                        |
| `UNIQUE`   | `public_id`               | -                        |
| `FK`       | `user_id`                 | `Users.id`               |
| `FK`       | `user_book_collection_id` | `UserBookCollections.id` |

### UserBookCollections

本のコレクションを管理するテーブル。

| カラム名          | 型          | 説明                   | 必須 |
| ----------------- | ----------- | ---------------------- | ---- |
| `id`              | `string`    | プライマリーキー       | ○    |
| `public_id`       | `string`    | 公開ID                 | ○    |
| `user_id`         | `string`    | ユーザーID（外部キー） | ○    |
| `provider_id`     | `string`    | 提供元のID             | ○    |
| `provider_type`   | `string`    | 提供元の種類           | ○    |
| `title`           | `string`    | 本のタイトル           | ○    |
| `authors`         | `string`    | 著者                   |      |
| `categories`      | `string`    | カテゴリ               |      |
| `thumbnail_url`   | `string`    | サムネイルの URL       |      |
| `published_dates` | `string`    | 出版日                 |      |
| `created_at`      | `timestamp` | 作成日時               | ○    |
| `updated_at`      | `timestamp` | 更新日時               |      |
| `deleted_at`      | `timestamp` | 削除日時               |      |

| 制約タイプ | カラム                         | 参照先     |
| ---------- | ------------------------------ | ---------- |
| `PK`       | `id`                           | -          |
| `UNIQUE`   | `public_id`                    | -          |
| `UNIQUE`   | `(provider_id, provider_type)` | -          |
| `FK`       | `user_id`                      | `Users.id` |

<br />

## 今後の拡張性

1. タグ機能の追加

   - PhraseTags テーブル

2. 新しいコレクションタイプ

   - 新しいコレクションテーブルを作成
   - 対応する関連テーブルを作成
