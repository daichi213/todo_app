# MySQLエラー集

## 日本語対応

### API側から見たエラー

API側からDBへ日本語のレコードを保存すると以下のように、Ginが例外を起こしてコンテナが落ちてしまう。

```log
api_1    | 2021/12/18 04:25:06 title:test title content:これはテストです？ええ、テストです！
api_1    | 2021/12/18 04:25:06 status:
api_1    | 2021/12/18 04:25:06 input is read.
api_1    | 
api_1    | 2021/12/18 04:25:06 /go/src/api/model.todo.go:39 Error 1366: Incorrect string value: '\xE3\x81\x93\xE3\x82\x8C...' for column 'content' at row 1
api_1    | [2.383ms] [rows:0] INSERT INTO `todos` (`created_at`,`updated_at`,`deleted_at`,`title`,`content`,`status`,`user_id`) VALUES ('2021-12-18 04:25:06.764','2021-12-18 04:25:06.764',NULL,'test title','これはテストです？ええ、テストです！',0,0)
api_1    | 2021/12/18 04:25:06 Could not create: Error 1366: Incorrect string value: '\xE3\x81\x93\xE3\x82\x8C...' for column 'content' at row 1
api_1    | exit status 1
todoapp_api_1 exited with code 
```


### DB側から見た挙動

/var/lib/mysql/General.logでログを確認すると以下のようなログが吐かれていた。

```log
2021-12-18T04:25:06.761154Z         3 Connect   root@192.168.200.1 on todo_test using TCP/IP
2021-12-18T04:25:06.761807Z         3 Query     SET NAMES utf8
2021-12-18T04:25:06.762343Z         3 Query     SELECT VERSION()
2021-12-18T04:25:06.763281Z         3 Query     START TRANSACTION
2021-12-18T04:25:06.765409Z         3 Prepare   INSERT INTO `todos` (`created_at`,`updated_at`,`deleted_at`,`title`,`content`,`status`,`user_id`) VALUES (?,?,?,?,?,?,?)
2021-12-18T04:25:06.765671Z         3 Execute   INSERT INTO `todos` (`created_at`,`updated_at`,`deleted_at`,`title`,`content`,`status`,`user_id`) VALUES ('2021-12-18 04:25:06.764','2021-12-18 04:25:06.764',NULL,'test title','これはテストです？ええ、テストです！',0,0)
2021-12-18T04:25:06.766274Z         3 Close stmt
2021-12-18T04:25:06.766367Z         3 Query     ROLLBACK
```

### DBの日本語対応

上記のようなエラーの原因はDBのOSレベルから日本語対応していないことが原因のようだった。