export type Thesis = {
	year: number;
	author: string;
	title: string;
	url?: string;
};

export type ThesisSection = {
	id: string;
	heading: string;
	items: Thesis[];
};

export const thesisSections: ThesisSection[] = [
	{
		id: 'doctoral',
		heading: '博士論文',
		items: [
			{ year: 2026, author: '奥田 萌莉', title: '深層学習による植物画像認識の専門家的知見を用いた特徴表現の拡張', url: 'https://u-hyogo.repo.nii.ac.jp/records/2000708' },
			{ year: 2026, author: 'ファム フーロン', title: 'A Study on Machine Learning Model Retrieval', url: 'https://u-hyogo.repo.nii.ac.jp/records/2000711' },
			{ year: 2025, author: '三林 亮太', title: 'ラップバトルにおけるバースの生成と分析', url: 'https://u-hyogo.repo.nii.ac.jp/records/2000448' },
			{ year: 2025, author: '森川 優', title: 'データ量制約とデータ非均質性を持つ問題における機械学習応用の研究', url: 'https://u-hyogo.repo.nii.ac.jp/records/2000461' },
		],
	},
	{
		id: 'masters',
		heading: '修士論文',
		items: [
			{ year: 2026, author: '黒木 空翔', title: '動機づけ面接に基づくカウンセリングチャットボットの構築と自動評価' },
			{ year: 2026, author: '中西 勇輝', title: '大規模言語モデルによる地図理解を用いた曖昧説明文からの位置推定' },
			{ year: 2026, author: '中山 裕紀', title: '不動産情報探索における俯瞰的閲覧のためのVRインタフェース' },
			{ year: 2026, author: '門垣 幸樹', title: '強化学習を用いた差動二輪車の未知実証環境における安全制御' },
			{ year: 2025, author: '芦澤 亜里紗', title: 'LLM による意味理解を利用した文書の分析と検索' },
			{ year: 2025, author: '桑田 若菜', title: '文字種とスタイルのエンコーディングに基づく日本語手書き文字生成' },
			{ year: 2025, author: '中屋 岳', title: '歌詞の繋がりを基にしたDJのための楽曲推薦' },
			{ year: 2025, author: '狹間 亮太朗', title: '人の性格特性と観光地レビューの関連推定' },
			{ year: 2025, author: '花谷 翔', title: '特許情報と業界規模の関係性分析' },
			{ year: 2025, author: '眞鍋 陽向', title: '深層学習によるプラズマ乱流の予測' },
			{ year: 2024, author: '伊藤 優真', title: '大規模言語モデル活用による意味類似性を考慮した本のレビュー検索' },
			{ year: 2024, author: '髙嶋 優快', title: '地図情報と場所の説明文から地点を推定するアプリケーション' },
			{ year: 2024, author: '張 雯佳', title: 'Recommending of Revisit-Worthy Information based on History of Web Browsing and File Usage' },
			{ year: 2024, author: '津田 裕哉', title: '物理オブジェクトとのMixed-Realityインタラクションに基づく情報組織化' },
			{ year: 2024, author: '西本 海生', title: 'ミュージアム鑑賞におけるビンゴゲームを用いた鑑賞軸の習得に関する研究' },
			{ year: 2024, author: '日置 淳也', title: 'インスタンスセグメンテーションにおける画像類似性に基づく機械学習モデル検索' },
			{ year: 2023, author: '奥田 萌莉', title: '深層学習を用いた画像認識による植物の葉の解析' },
			{ year: 2023, author: '古屋 昭拓', title: '特許マイニングによる類似度推定に基づく物質の新たな用途の発見' },
			{ year: 2023, author: '王 丹', title: 'Visual Metaphor Generation based on Similarities in Appearance and Concept' },
			{ year: 2022, author: '上田 昌輝', title: '博物館見学における見学体験向上のためのクイズ生成' },
			{ year: 2022, author: '川原 敬史', title: '汎用言語モデルを用いた日常生活に潜む事故リスクの推定' },
			{ year: 2022, author: '坂根 和光', title: '場所の説明文に対する位置特定容易性の分析' },
			{ year: 2022, author: '濵島 聡一郎', title: '健康情報検索におけるユーザの信憑性意識調査' },
			{ year: 2022, author: '松本 直彰', title: '記事の続報関係に基づく探索者ビューを用いたニュースアーカイブ探索' },
			{ year: 2022, author: '三林 亮太', title: 'ラップバトルにおけるライムとアンサーを考慮したバース生成' },
			{ year: 2022, author: '吉村 拓真', title: '人の特徴と場所の特徴を用いたストレス推定' },
			{ year: 2022, author: '福島 航平', title: 'チラシ媒体通販における商品の販売数予測' },
			{ year: 2021, author: '顧 席銘', title: '画像認識における教師データ不足への対応に関する研究' },
			{ year: 2021, author: '崔 洙瑚', title: 'ウェブ広告閲覧履歴を用いたユーザ属性の推定' },
			{ year: 2021, author: '中田 祐誠', title: 'ウェブ検索クエリを用いたオンライン商品購買行動の予測と分析' },
			{ year: 2021, author: '橋口 友哉', title: 'コミュニティ型質問応答コンテンツを用いた共感できる悩みの検索と生成' },
			{ year: 2021, author: 'ファム フーロン', title: 'Life Improvement based on Human Activity Recognition using IoT Sensor Devices' },
			{ year: 2020, author: '堂本 凌祐', title: '正規化相互情報量による特徴値選択アルゴリズム評価' },
			{ year: 2020, author: '西村 和貴', title: '観光地の組み合わせによる評価のバイアス分析の研究' },
			{ year: 2020, author: '牧田 真朋', title: '準同型暗号を用いたハミング距離の2パーティー秘匿計算' },
			{ year: 2020, author: 'マハルジャン ラビン', title: 'IoTセンサデバイスを用いた行動認識と話題提供の研究' },
			{ year: 2020, author: '村本 直樹', title: '特徴的な表現を考慮したユーザ生成メディア検索の研究' },
			{ year: 2020, author: '楊 澤華', title: '展示物と見学者の関係性に基づくミュージアム鑑賞体験の個人化' },
			{ year: 2020, author: '吉井 健紘', title: '仮想現実における認知範囲を考慮した文書閲覧環境の研究' },
			{ year: 2019, author: '白髪 宙海', title: '再訪問に着目した飲食店レビューの分析' },
		],
	},
	{
		id: 'bachelors',
		heading: '卒業論文',
		items: [
			{ year: 2026, author: '岡田 敦生', title: 'モデルエンベディングに基づくタスクに適応するLLMの検索' },
			{ year: 2026, author: '河野 心斗', title: '新聞記事データに基づく喫煙に関する社会的関心の変遷分析' },
			{ year: 2026, author: '島内 健志', title: 'BERTを用いたWebページタイトルに基づく広告クリック推定' },
			{ year: 2026, author: '松本 美風', title: 'LLMによる道案内のための目印地物の特定と説明文生成' },
			{ year: 2026, author: '村上 耀紀', title: '行政施策情報に関する質問応答ボットのためのQAデータセットの自動構築' },
			{ year: 2025, author: '上田 健斗', title: '視覚認識を要する数学問題のChatGPTを用いた教育的解答生成' },
			{ year: 2025, author: '上村 悠斗', title: 'ウェブサイトのテキストを基にした広告クリック予測モデル' },
			{ year: 2025, author: '木下 真帆', title: '自己教師あり線画特徴学習による意外な形状の展示物発見' },
			{ year: 2025, author: '高田 純和', title: 'RAGを用いた授業評価インタビュワーによる意見抽出' },
			{ year: 2025, author: '山口 貴也', title: 'LLMを用いた新聞記事アーカイブの重大事件の動機分析' },
			{ year: 2024, author: '奥田 颯馬', title: 'トピック具体化による映画レビュー執筆支援' },
			{ year: 2024, author: '常松 大雅', title: '高圧ガス関連文書を用いた検索拡張生成による質問応答' },
			{ year: 2024, author: '中西 勇輝', title: '授業改善のための意見を引き出すAIインタビュアー' },
			{ year: 2024, author: '中山 裕紀', title: 'VR空間における情報の絞り込みとLoD操作による不動産情報探索' },
			{ year: 2024, author: '門垣 幸樹', title: '強化学習による差動二輪車制御における内外乱適応' },
			{ year: 2023, author: '芦澤 亜里紗', title: '食品レビューにおける観点抽出とその検索への応用' },
			{ year: 2023, author: '桑田 若菜', title: '文字種とスタイルを考慮した文字生成モデルによる文字の生成と分析' },
			{ year: 2023, author: '狹間 亮太朗', title: '観光地における人と場所の特徴を用いたストレスおよび主観的な場所評価の推定' },
			{ year: 2023, author: '花谷 翔', title: '特許中の語に着目した被引用数予測による重要な特許の発見' },
			{ year: 2023, author: '眞鍋 陽向', title: '深層学習を用いたプラズマ乱流の予測' },
		],
	},
];
