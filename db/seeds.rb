Character.destroy_all
User.destroy_all

john = User.create( userName: 'John', playerNum: '1', lifePoints: '4000')
michael = User.create( userName: 'Michael', playerNum: '2', lifePoints: '4000')

yugi = Character.create( name: 'Yugi Muto', image: 'https://inst-2.cdn.shockers.de/hs_cdn/out/pictures//master/product/1/yam-yugi-maske--yugi-muto-maske--yu-gi-oh-kostuem-zubehoer--28221.jpg', user_id: john.id)
kaiba = Character.create( name: 'Seto Kaiba', image: 'https://vignette.wikia.nocookie.net/ygotas/images/5/5f/Sk.gif/revision/latest?cb=20130813104525', user_id: michael.id)

card = Card.create()