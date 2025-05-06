# データベース構成

## 概要

Book Manager のデータベースは、ユーザーのフレーズ（Phrase）と各種コレクションを管理するための構成となっています。
各コレクションタイプ（本、記事など）は独立したテーブルとして管理され、Phrase との関連付けが可能です。

<br />

## テーブル構成

### UserPhrases

ユーザーが作成したフレーズを管理するテーブル。

| カラム名                | 型        | 説明                           | 必須 |
| ----------------------- | --------- | ------------------------------ | ---- |
| id                      | string    | プライマリーキー               | ○    |
| public_id               | string    | 公開ID                         | ○    |
| user_id                 | string    | ユーザーID（外部キー）         | ○    |
| user_book_collection_id | string    | 本のコレクションID（外部キー） | ○    |
| content                 | text      | フレーズの内容                 | ○    |
| created_at              | timestamp | 作成日時                       | ○    |
| updated_at              | timestamp | 更新日時                       | ○    |

### UserBookCollections

本のコレクションを管理するテーブル。

| カラム名        | 型        | 説明                   | 必須 |
| --------------- | --------- | ---------------------- | ---- |
| id              | string    | プライマリーキー       | ○    |
| public_id       | string    | 公開ID                 | ○    |
| user_id         | string    | ユーザーID（外部キー） | ○    |
| provider_id     | string    | 提供元のID             | ○    |
| provider_type   | string    | 提供元の種類           | ○    |
| title           | string    | 本のタイトル           | ○    |
| authors         | string    | 著者                   | ×    |
| categories      | string    | カテゴリ               | ×    |
| thumbnail_url   | string    | サムネイルの URL       | ×    |
| published_dates | string    | 出版日                 | ×    |
| created_at      | timestamp | 作成日時               | ○    |
| updated_at      | timestamp | 更新日時               | ○    |

<br />

## インデックス

### UserPhrases

- user_id
- created_at

### UserBookCollections

- user_id
- isbn
- created_at

## 外部キー制約

- UserPhrases.user_id → Users.id
- UserBookCollections.user_id → Users.id
- UserArticleCollections.user_id → Users.id

<br />

## 今後の拡張性

1. 新しいコレクションタイプの追加

   - 新しいコレクションテーブルを作成
   - 対応する関連テーブルを作成

2. メタデータの拡張

   - 各コレクションテーブルにメタデータカラムを追加可能
   - JSONB型を使用して柔軟なメタデータ管理も検討可能

3. タグ機能

   - PhraseTags テーブル

4. 共有機能
   - SharingSettings テーブル
   - SharedCollections テーブル
