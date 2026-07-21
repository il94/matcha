// Photos réelles récupérées automatiquement depuis Wikimedia Commons (portraits
// pour les célébrités, cosplay/costume pour les personnages fictifs) afin de
// peupler les profils générés dans generateUsers.ts avec 2 à 3 photos chacun.

export const CHARACTER_PICTURES: Record<string, string[]> = {
	"Kylian Mbappé": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Kylian_Mbappe_-_France_v_Norway_-_26_June_2026_%28cropped%29.jpg/960px-Kylian_Mbappe_-_France_v_Norway_-_26_June_2026_%28cropped%29.jpg",
		"https://www.lequipe.fr/_medias/img-photo-jpg/mbappe-est-devenu-meilleur-buteur-de-l-histoire-de-la-coupe-du-monde-en-inscrivant-10-buts-lors-de-l/1500000002536228/0:0,2000:1333-828-828-75/82450.jpg",
		"https://www.leparisien.fr/resizer/jpnd9zLlb4V-wxLBWeUiLng_RiQ=/1400x0/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/L3VMTAGYWZBT3NK332D45LJ4TE.jpg",
	],
	"Lionel Messi": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Suisse_vs_Argentine_-_Granit_Xhaka_%26_Lionel_Messi.jpg/960px-Suisse_vs_Argentine_-_Granit_Xhaka_%26_Lionel_Messi.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Vanessa_Modely_Cristiano_Ronaldo_Lionel_Messi.jpg/960px-Vanessa_Modely_Cristiano_Ronaldo_Lionel_Messi.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/14/Lionel_Messi_26_June_2018_%28cropped%29.jpg",
	],
	"Cristiano Ronaldo": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Cristiano_Ronaldo_%28cropped%29.jpg/960px-Cristiano_Ronaldo_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/61/Cristiano_Ronaldo%2C_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Argentine_-_Portugal_-_Cristiano_Ronaldo.jpg/960px-Argentine_-_Portugal_-_Cristiano_Ronaldo.jpg",
	],
	"Neymar Santos Jr": [
		"https://upload.wikimedia.org/wikipedia/commons/6/62/Neymar.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/72/Neymar_FCBarcelona.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Neymar_v_Almeria_020314.jpg/960px-Neymar_v_Almeria_020314.jpg",
	],
	"Erling Haaland": [
		"https://upload.wikimedia.org/wikipedia/commons/f/f0/Erling_Haaland_2020.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Erling_Haaland_2023.jpg/960px-Erling_Haaland_2023.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/07/Erling_Haaland_2023_%28cropped%29.jpg",
	],
	"Kevin De Bruyne": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Romelu_Lukaku_and_Kevin_De_Bruyne_vs_USA.jpg/960px-Romelu_Lukaku_and_Kevin_De_Bruyne_vs_USA.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Kevin_De_Bruyne_at_Samsung.jpg/960px-Kevin_De_Bruyne_at_Samsung.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Kevin_De_Bruyne_%2824640482031%29_%28cropped%29.jpg/960px-Kevin_De_Bruyne_%2824640482031%29_%28cropped%29.jpg",
	],
	"Karim Benzema": [
		"https://upload.wikimedia.org/wikipedia/commons/2/23/Karim_Benzema.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/85/Karim_Benzema_2012.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Karim_Benzema_wearing_Real_Madrid_home_kit_2021-2022.jpg/960px-Karim_Benzema_wearing_Real_Madrid_home_kit_2021-2022.jpg",
	],
	"Zinedine Zidane": [
		"https://upload.wikimedia.org/wikipedia/commons/9/9d/Zinedine_Zidane.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Zinedine_zidane_wcf_2006.jpg/960px-Zinedine_zidane_wcf_2006.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Zinedine_Zidane_2008-2.jpg/960px-Zinedine_Zidane_2008-2.jpg",
	],
	"Ronaldinho Gaúcho": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Ronaldinho_Ga%C3%BAcho.jpg/960px-Ronaldinho_Ga%C3%BAcho.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a2/Ronaldinho_Ga%C3%BAcho_soccer_star.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ronaldinho_Ga%C3%BAcho_2016.jpg/960px-Ronaldinho_Ga%C3%BAcho_2016.jpg",
	],
	"Ronaldo Nazário": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sdm_4649_Ronaldo_Naz%C3%A1rio.jpg/960px-Sdm_4649_Ronaldo_Naz%C3%A1rio.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b0/Ronaldo_Naz%C3%A1rio.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/A%C3%A9cio_Neves%2C_Ronaldo_Naz%C3%A1rio_e_Luciano_Huck_-_Pr%C3%AAmio_Brasileiro_do_Ano_da_Isto%C3%89_-_07_12_2009_%288389712606%29.jpg/960px-A%C3%A9cio_Neves%2C_Ronaldo_Naz%C3%A1rio_e_Luciano_Huck_-_Pr%C3%AAmio_Brasileiro_do_Ano_da_Isto%C3%89_-_07_12_2009_%288389712606%29.jpg",
	],
	"Diego Maradona": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Diego_Maradona_2012.jpg/960px-Diego_Maradona_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Diego_Maradona_2012_1.jpg/960px-Diego_Maradona_2012_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Diego_Maradona_celebrando_la_obtenci%C3%B3n_del_Torneo_Metropolitano_de_1981.jpg/960px-Diego_Maradona_celebrando_la_obtenci%C3%B3n_del_Torneo_Metropolitano_de_1981.jpg",
	],
	"David Beckham": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/David_Beckham.jpg/960px-David_Beckham.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/David_Beckham_2010_LA_Galaxy.jpg/960px-David_Beckham_2010_LA_Galaxy.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c1/David_Beckham_Football_Academy_-_geograph.org.uk_-_1145590.jpg",
	],
	"Thierry Henry": [
		"https://upload.wikimedia.org/wikipedia/commons/d/d2/Thierry_Henry_FC_Barcelona.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Thierry_Henry_-_001.jpg/960px-Thierry_Henry_-_001.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Kenny_Cooper_points_to_Thierry_Henry%2C_New_York_Red_Bulls_vs_San_Jose_Earthquakes.jpg/960px-Kenny_Cooper_points_to_Thierry_Henry%2C_New_York_Red_Bulls_vs_San_Jose_Earthquakes.jpg",
	],
	"Didier Drogba": [
		"https://upload.wikimedia.org/wikipedia/commons/6/66/Didier_Drogba%2C_ORANGE%2C_Hotel_Sofitel%2C_Abidjan-Plateau%2C_Ivory_Coast%2C_11.06.%2708_%289994%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/42/Didier_Drogba_Champions_League_Winner.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Didier_Drogba_%28GS%29.JPG/960px-Didier_Drogba_%28GS%29.JPG",
	],
	"Andrés Iniesta": [
		"https://upload.wikimedia.org/wikipedia/commons/4/4f/Andr%C3%A9s_Iniesta_-_001.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Andr%C3%A9s_Iniesta_2011.jpg/960px-Andr%C3%A9s_Iniesta_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/ed/Ignazio_Abate_and_Andr%C3%A9s_Iniesta_Euro_2012_final.jpg",
	],
	"Xavi Hernández": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1e/Xavi_Hern%C3%A1ndez_-_001.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/40/Xavi_Hern%C3%A1ndez_-_002.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/aa/Xavi_Hern%C3%A1ndez_-_002_%28cropped%29.jpg",
	],
	"Luka Modrić": [
		"https://upload.wikimedia.org/wikipedia/commons/0/05/Luka_Modri%C4%87_spurs.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/4c/Luka_Modri%C4%87_against_Sevilla.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/55/Luka_Modri%C4%87_in_2018.jpg",
	],
	"Robert Lewandowski": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Robert_Lewandowski_2011_%282%29.jpg/960px-Robert_Lewandowski_2011_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Robert_Lewandowski_Training_2017-03_FC_Bayern_Muenchen-3.jpg/960px-Robert_Lewandowski_Training_2017-03_FC_Bayern_Muenchen-3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/86/Robert_Lewandowski_2011_%283%29_%28cropped%29.jpg",
	],
	"Mohamed Salah": [
		"https://upload.wikimedia.org/wikipedia/commons/d/da/Mohamed_Salah_2022.png",
		"https://upload.wikimedia.org/wikipedia/commons/b/b4/Mohamed_Salah_Jedidi.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Mosqu%C3%A9e_Mohamed_Salah_sayadi_03.jpg/960px-Mosqu%C3%A9e_Mohamed_Salah_sayadi_03.jpg",
	],
	"Sadio Mané": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kevin_Kampl_Sadio_Man%C3%A9.JPG/960px-Kevin_Kampl_Sadio_Man%C3%A9.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Sadio_Man%C3%A9_Martin_Hinteregger_38.JPG/960px-Sadio_Man%C3%A9_Martin_Hinteregger_38.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Sadio_Man%C3%A9_et_D%C3%A9sir%C3%A9_S%C3%A8gb%C3%A8_Azankpo.jpg/960px-Sadio_Man%C3%A9_et_D%C3%A9sir%C3%A9_S%C3%A8gb%C3%A8_Azankpo.jpg",
	],
	"Virgil van Dijk": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Virgil_van_Dijk_06042025_%282%29.jpg/960px-Virgil_van_Dijk_06042025_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Virgil_van_Dijk_%2C_Curtis_Jones_and_Dominik_Szoboszlai_04012026_%281%29.jpg/960px-Virgil_van_Dijk_%2C_Curtis_Jones_and_Dominik_Szoboszlai_04012026_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Virgil_van_Dijk%2C_Curtis_Jones_and_Harry_Wilson_04012026_%281%29.jpg/960px-Virgil_van_Dijk%2C_Curtis_Jones_and_Harry_Wilson_04012026_%281%29.jpg",
	],
	"Sergio Ramos": [
		"https://upload.wikimedia.org/wikipedia/commons/0/07/Sergio_Ramos_Espanyol_2010.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Diego_Costa_-_Sergio_Ramos.JPG/960px-Diego_Costa_-_Sergio_Ramos.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sergio_Ramos_Confederations_Cup_2013_%28cropped%29.jpg/960px-Sergio_Ramos_Confederations_Cup_2013_%28cropped%29.jpg",
	],
	"Gianluigi Buffon": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Gianluigi_Buffon_and_Salvatore_Sirigu.jpg/960px-Gianluigi_Buffon_and_Salvatore_Sirigu.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Singapore_Selection_vs_Juventus%2C_2014%2C_Gianluigi_Buffon.jpg/960px-Singapore_Selection_vs_Juventus%2C_2014%2C_Gianluigi_Buffon.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Juventus_vs_Malmoe%2C_2014%2C_Gianluigi_Buffon.jpg/960px-Juventus_vs_Malmoe%2C_2014%2C_Gianluigi_Buffon.jpg",
	],
	"Iker Casillas": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/14-6-2011_Visita_Iker_Casillas_%285833110137%29.jpg/960px-14-6-2011_Visita_Iker_Casillas_%285833110137%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/14-6-2011_Visita_Iker_Casillas_%285833662072%29.jpg/960px-14-6-2011_Visita_Iker_Casillas_%285833662072%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/14-6-2011_Visita_Iker_Casillas_%285833661634%29.jpg/960px-14-6-2011_Visita_Iker_Casillas_%285833661634%29.jpg",
	],
	"Paul Pogba": [
		"https://upload.wikimedia.org/wikipedia/commons/b/bf/Paul_Pogba_Juventus.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Manchester_United_v_Zorya_Luhansk%2C_September_2016_%2807%29_-_Paul_Pogba_%28edited%29.jpg/960px-Manchester_United_v_Zorya_Luhansk%2C_September_2016_%2807%29_-_Paul_Pogba_%28edited%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/13/Paul_Pogba_in_2018.jpg",
	],
	"Antoine Griezmann": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Antoine_Griezmann.jpg/960px-Antoine_Griezmann.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Antoine_Griezmann_%28cropped%29.jpg/960px-Antoine_Griezmann_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Antoine_Griezmann_-_CdR_-_RM_v_ATL.jpg/960px-Antoine_Griezmann_-_CdR_-_RM_v_ATL.jpg",
	],
	"N'Golo Kanté": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5f/N%27Golo_Kant%C3%A9.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2e/N%27Golo_Kant%C3%A9_Russia_2018.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/09/Tatouage_N%27Golo_Kant%C3%A9.jpg",
	],
	"Hugo Lloris": [
		"https://upload.wikimedia.org/wikipedia/commons/a/aa/Hugo_Lloris.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/8/8e/Hugo_Lloris_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/16/Hugo_Lloris_Euro_2012_v2.jpg",
	],
	"Raphaël Varane": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rapha%C3%ABl_Varane_%281%29.jpg/960px-Rapha%C3%ABl_Varane_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rapha%C3%ABl_Varane_%283%29.jpg/960px-Rapha%C3%ABl_Varane_%283%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6f/Rapha%C3%ABl_Varane.JPG",
	],
	"Marta Vieira da Silva": [
		"https://upload.wikimedia.org/wikipedia/commons/1/19/Marta_Vieira_da_Silva_a_96_7136_%2810180724656%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6c/Marta_Vieira_da_Silva_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rio_di_Santa_Marta_-_Venezia.jpg/960px-Rio_di_Santa_Marta_-_Venezia.jpg",
	],
	"Alex Morgan": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Alex_Morgan.jpg/960px-Alex_Morgan.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Alex_Morgan_striding.jpg/960px-Alex_Morgan_striding.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Alex_Morgan_%2842206021115%29.jpg/960px-Alex_Morgan_%2842206021115%29.jpg",
	],
	"Megan Rapinoe": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Megan_Rapinoe_and_Leslie_Osborne.jpg/960px-Megan_Rapinoe_and_Leslie_Osborne.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Alanna_Kennedy_vs_Megan_Rapinoe.jpg/960px-Alanna_Kennedy_vs_Megan_Rapinoe.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0e/Alex_Morgan_%26_Megan_Rapinoe_%2847957688266%29.jpg",
	],
	"Ada Hegerberg": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ada_Hegerberg_2013_1.jpg/960px-Ada_Hegerberg_2013_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Ada_Hegerberg_2013.jpg/960px-Ada_Hegerberg_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0b/Ada_Hegerberg_2013_%28cropped%29.jpg",
	],
	"Wendie Renard": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b5/Wendie-renard.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/20131031_FR02_Wendie_Renard_9219.jpg/960px-20131031_FR02_Wendie_Renard_9219.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/20131031_FR02_Wendie_Renard_9228.jpg/960px-20131031_FR02_Wendie_Renard_9228.jpg",
	],
	"Vinícius Júnior": [
		"https://upload.wikimedia.org/wikipedia/commons/7/77/Vin%C3%ADcius_J%C3%BAnior.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/64/Vin%C3%ADcius_J%C3%BAnior_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b3/Vin%C3%ADcius_J%C3%BAnior_POTM_nov2021.png",
	],
	"Jude Bellingham": [
		"https://upload.wikimedia.org/wikipedia/commons/3/31/Jude_Bellingham_Birmingham_2019.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190614-2.jpg/960px-25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Jude_Bellingham_-_240422_190614-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Jude_Bellingham_during_EA_Sports_on_Sep_26_2024.jpg/960px-Jude_Bellingham_during_EA_Sports_on_Sep_26_2024.jpg",
	],
	"Pedri González": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Pedri-Shemeikka.jpg/960px-Pedri-Shemeikka.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Celeste_Pedri-Spade_-_Anti-Pipeline_Society_Kwe_-_Material_Kwe_2019.jpg/960px-Celeste_Pedri-Spade_-_Anti-Pipeline_Society_Kwe_-_Material_Kwe_2019.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Astyanax_pedri_female_%28MCN_19698%29.png/960px-Astyanax_pedri_female_%28MCN_19698%29.png",
	],
	"Bukayo Saka": [
		"https://upload.wikimedia.org/wikipedia/commons/2/2e/Bukayo_Saka.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/1_bukayo_saka_arsenal_2025.jpg/960px-1_bukayo_saka_arsenal_2025.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/1_bukayo_saka_arsenal_2025_%28cropped%29.jpg/960px-1_bukayo_saka_arsenal_2025_%28cropped%29.jpg",
	],
	"Harry Kane": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Harry_Kane.jpg/960px-Harry_Kane.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Laurent_Koscielny_of_France_marking_England_striker_Harry_Kane_%2822695724617%29.jpg/960px-Laurent_Koscielny_of_France_marking_England_striker_Harry_Kane_%2822695724617%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/The_Prime_Minister_speaks_to_Harry_Kane_%2852770663548%29.jpg/960px-The_Prime_Minister_speaks_to_Harry_Kane_%2852770663548%29.jpg",
	],
	"Kaká Leite": [
		"https://upload.wikimedia.org/wikipedia/commons/9/96/Kak%C3%A1_vs_Xerez_in_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Kak%C3%A1_vs_Getafe_CF_2009-10-31.jpg/960px-Kak%C3%A1_vs_Getafe_CF_2009-10-31.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kak%C3%A1_smiles_at_Houston_fans_%2817095628385%29.jpg/960px-Kak%C3%A1_smiles_at_Houston_fans_%2817095628385%29.jpg",
	],
	"LeBron James": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lebron_James_2_Shankbone_More_Than_a_Game.jpg/960px-Lebron_James_2_Shankbone_More_Than_a_Game.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/LeBron_James_%281%29.jpg/960px-LeBron_James_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/cf/LeBron_James_crop.jpg",
	],
	"Michael Jordan": [
		"https://upload.wikimedia.org/wikipedia/commons/a/ae/Michael_Jordan_in_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e4/Michael_Jordan_at_the_White_House_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Michael_Jordan_and_LeBron_James_%2851915736273%29.jpg/960px-Michael_Jordan_and_LeBron_James_%2851915736273%29.jpg",
	],
	"Kobe Bryant": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Kobe_Bryant_8.jpg/960px-Kobe_Bryant_8.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Michael_Phelps_%26_Kobe_Bryant_Red_Carpet_%40_2008_MTV_Video_Music_Awards.jpg/960px-Michael_Phelps_%26_Kobe_Bryant_Red_Carpet_%40_2008_MTV_Video_Music_Awards.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Derek_Fisher%2C_Kobe_Bryant.jpg/960px-Derek_Fisher%2C_Kobe_Bryant.jpg",
	],
	"Stephen Curry": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Stephen_Curry_2.jpg/960px-Stephen_Curry_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/3e/Stephen_Curry_Australian_comedian.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Stephen_Curry_close_up.jpg/960px-Stephen_Curry_close_up.jpg",
	],
	"Kevin Durant": [
		"https://upload.wikimedia.org/wikipedia/commons/c/cd/Kevin_durant_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Golden_State_Warriors_Small_Forward_Kevin_Durant.jpg/960px-Golden_State_Warriors_Small_Forward_Kevin_Durant.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Stephen_Curry_and_Kevin_Durant.jpg/960px-Stephen_Curry_and_Kevin_Durant.jpg",
	],
	"Giannis Antetokounmpo": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Giannis_Antetokounmpo_%2851914619427%29.jpg/960px-Giannis_Antetokounmpo_%2851914619427%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Giannis_Antetokounmpo_%2851915715053%29.jpg/960px-Giannis_Antetokounmpo_%2851915715053%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/LeBron_James%2C_Giannis_Antetokounmpo%2C_and_Joel_Embiid_%2851916594469%29.jpg/960px-LeBron_James%2C_Giannis_Antetokounmpo%2C_and_Joel_Embiid_%2851916594469%29.jpg",
	],
	"Victor Wembanyama": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Victor_Wembanyama_ASVEL_%28cropped%29.jpg/960px-Victor_Wembanyama_ASVEL_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Victor_Wembanyama_Mets_92.jpg/960px-Victor_Wembanyama_Mets_92.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Victor_Wembanyama_NBA_Paris_Game.jpg/960px-Victor_Wembanyama_NBA_Paris_Game.jpg",
	],
	"Tony Parker": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Tony_Parker%2C_France_-_Canada_July_2011_%281%29.jpg/960px-Tony_Parker%2C_France_-_Canada_July_2011_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Tony_Parker_during_a_game.JPG/960px-Tony_Parker_during_a_game.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Tony_Parker_2011_02.jpg/960px-Tony_Parker_2011_02.jpg",
	],
	"Shaquille O'Neal": [
		"https://upload.wikimedia.org/wikipedia/commons/a/ab/Shaquille_O%27Neal_Buckley_Air_Base.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Shaquille_O%27Neal_at_Phoenix_at_Golden_State_3-15-09_2.JPG/960px-Shaquille_O%27Neal_at_Phoenix_at_Golden_State_3-15-09_2.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/6/65/Lipofsky_Shaquille_O%27Neal.jpg",
	],
	"Magic Johnson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Philip_and_Magic_Johnson.JPG/960px-Philip_and_Magic_Johnson.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/c/cf/Magic_Johnson_Mercedes-Benz_Carousel_of_Hope_Gala_2014_%2815333080200%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Magic_Johnson_1999.jpg/960px-Magic_Johnson_1999.jpg",
	],
	"Kareem Abdul-Jabbar": [
		"https://upload.wikimedia.org/wikipedia/commons/5/57/Kareem_Abdul_Jabbar_crop.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cultural_Ambassador_Kareem_Abdul-Jabbar_Plays_Basketball_%286760550861%29.jpg/960px-Cultural_Ambassador_Kareem_Abdul-Jabbar_Plays_Basketball_%286760550861%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Global_Cultural_Ambassador_Kareem_Abdul-Jabbar_Engages_Youth_%286767472475%29.jpg/960px-Global_Cultural_Ambassador_Kareem_Abdul-Jabbar_Engages_Youth_%286767472475%29.jpg",
	],
	"Dirk Nowitzki": [
		"https://upload.wikimedia.org/wikipedia/commons/8/8a/Dirk_Nowitzki_Nanjing.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Dirk_Nowitzki_-_2019202165154_2019-07-21_Champions_for_Charity_-_0073_-_5DSR2371.jpg/960px-Dirk_Nowitzki_-_2019202165154_2019-07-21_Champions_for_Charity_-_0073_-_5DSR2371.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Dirk_Nowitzki_-_2019202192113_2019-07-21_Champions_for_Charity_-_3914_-_B70I3949.jpg/960px-Dirk_Nowitzki_-_2019202192113_2019-07-21_Champions_for_Charity_-_3914_-_B70I3949.jpg",
	],
	"Luka Dončić": [
		"https://upload.wikimedia.org/wikipedia/commons/0/0e/Luka_Don%C4%8Di%C4%87.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Jonas_Ma%C4%8Diulis_8_%26_Luka_Don%C4%8Di%C4%87_7_Real_Madrid_Baloncesto_Euroleague_20161201.jpg/960px-Jonas_Ma%C4%8Diulis_8_%26_Luka_Don%C4%8Di%C4%87_7_Real_Madrid_Baloncesto_Euroleague_20161201.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Luka_Don%C4%8Di%C4%87_7_Real_Madrid_Baloncesto_Euroleague_20161201_%282%29.jpg/960px-Luka_Don%C4%8Di%C4%87_7_Real_Madrid_Baloncesto_Euroleague_20161201_%282%29.jpg",
	],
	"Diana Taurasi": [
		"https://upload.wikimedia.org/wikipedia/commons/6/62/Diana_Taurasi.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Diana_Taurasi_Naismith_Award_2004.jpg/960px-Diana_Taurasi_Naismith_Award_2004.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Diana_taurasi_flickr.jpg/960px-Diana_taurasi_flickr.jpg",
	],
	"A'ja Wilson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Temi_Fagbenle_%2814%29_looks_for_a_rebound_and_is_guarded_by_A%27ja_Wilson_%2822%29_and_Tamara_Young_%281%29.jpg/960px-Temi_Fagbenle_%2814%29_looks_for_a_rebound_and_is_guarded_by_A%27ja_Wilson_%2822%29_and_Tamara_Young_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Alaina_Coates_looks_for_a_pass_as_she%27s_guarded_by_A%27ja_Wilson_%2822%29_%2848092680196%29.jpg/960px-Alaina_Coates_looks_for_a_pass_as_she%27s_guarded_by_A%27ja_Wilson_%2822%29_%2848092680196%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Danielle_Robinson_passes_to_Damitris_Dantas_around_A%27ja_Wilson_%2848092775582%29.jpg/960px-Danielle_Robinson_passes_to_Damitris_Dantas_around_A%27ja_Wilson_%2848092775582%29.jpg",
	],
	"Rafael Nadal": [
		"https://upload.wikimedia.org/wikipedia/commons/4/46/Rafael_Nadal_Iberia_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Rafael_Nadal_in_La_Moneda-001.jpg/960px-Rafael_Nadal_in_La_Moneda-001.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/23/Rafael_Nadal_in_La_Moneda-007.jpg",
	],
	"Roger Federer": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Roger_Federer_%2826_June_2009%2C_Wimbledon%29.jpg/960px-Roger_Federer_%2826_June_2009%2C_Wimbledon%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roger_Federer_Indian_Wells.jpg/960px-Roger_Federer_Indian_Wells.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Roger_Federer_%288168181320%29.jpg/960px-Roger_Federer_%288168181320%29.jpg",
	],
	"Novak Djokovic": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Novak_Djokovic.jpg/960px-Novak_Djokovic.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Novak_Djokovic_%40_BNP_Paribas_2012_Open.jpg/960px-Novak_Djokovic_%40_BNP_Paribas_2012_Open.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Novak_Djokovic_%2825797259405%29.jpg/960px-Novak_Djokovic_%2825797259405%29.jpg",
	],
	"Serena Williams": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Serena_Williams_-_Roland_Garros_2013_-_008.jpg/960px-Serena_Williams_-_Roland_Garros_2013_-_008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Serena_Williams_at_the_US_Open_2013_%289665945210%29.jpg/960px-Serena_Williams_at_the_US_Open_2013_%289665945210%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6d/Serena_Williams_%287105786177%29.jpg",
	],
	"Venus Williams": [
		"https://upload.wikimedia.org/wikipedia/commons/0/0d/Venus_Williams_playing_to_Agnieszka_Radwanska.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Venus_Williams.jpg/960px-Venus_Williams.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Serena_and_Venus_Williams_%289630786583%29.jpg/960px-Serena_and_Venus_Williams_%289630786583%29.jpg",
	],
	"Naomi Osaka": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Naomi_Osaka_%2827574903836%29.jpg/960px-Naomi_Osaka_%2827574903836%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Naomi_Osaka_%2827513994882%29.jpg/960px-Naomi_Osaka_%2827513994882%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Naomi_Osaka_%2827540546101%29.jpg/960px-Naomi_Osaka_%2827540546101%29.jpg",
	],
	"Andy Murray": [
		"https://upload.wikimedia.org/wikipedia/commons/f/f8/Andy_Murray_at_the_2008_US_Open4.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Andy_Murray_at_the_2008_US_Open6.jpg/960px-Andy_Murray_at_the_2008_US_Open6.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Andy_Murray_-_2011_Wimbledon.jpg/960px-Andy_Murray_-_2011_Wimbledon.jpg",
	],
	"Yannick Noah": [
		"https://upload.wikimedia.org/wikipedia/commons/a/a2/Yannick_Noah_POPB_Octobre_2004_-_04.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Yannick_Noah_en_2012.JPG/960px-Yannick_Noah_en_2012.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/5/5a/Yannick_Noah_%28Davis_Cup%29.jpg",
	],
	"Amélie Mauresmo": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Am%C3%A9lie_Mauresmo_at_the_2009_Wimbledon_Championships_03.jpg/960px-Am%C3%A9lie_Mauresmo_at_the_2009_Wimbledon_Championships_03.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Am%C3%A9lie_Mauresmo_at_the_2009_US_Open_01.jpg/960px-Am%C3%A9lie_Mauresmo_at_the_2009_US_Open_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Am%C3%A9lie_Mauresmo_at_the_2009_US_Open_02.jpg/960px-Am%C3%A9lie_Mauresmo_at_the_2009_US_Open_02.jpg",
	],
	"Carlos Alcaraz": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Carlos_Alcaraz_Argentina_Open_2024.jpg/960px-Carlos_Alcaraz_Argentina_Open_2024.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Damir_D%C5%BEumhur_vs_Carlos_Alcaraz%2C_2025_Roland_Garros%2C_2025-05-30_%2815%29.jpg/960px-Damir_D%C5%BEumhur_vs_Carlos_Alcaraz%2C_2025_Roland_Garros%2C_2025-05-30_%2815%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Damir_D%C5%BEumhur_vs_Carlos_Alcaraz%2C_2025_Roland_Garros%2C_2025-05-30_%2838%29.jpg/960px-Damir_D%C5%BEumhur_vs_Carlos_Alcaraz%2C_2025_Roland_Garros%2C_2025-05-30_%2838%29.jpg",
	],
	"Usain Bolt": [
		"https://upload.wikimedia.org/wikipedia/commons/8/8e/Usain_Bolt_200_m_Berlin_2009.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Usain_Bolt_winning-cropped2.jpg/960px-Usain_Bolt_winning-cropped2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Usain_Bolt_Olympics_Celebration.jpg/960px-Usain_Bolt_Olympics_Celebration.jpg",
	],
	"Marie-José Pérec": [
		"https://upload.wikimedia.org/wikipedia/commons/0/04/Marie-Jos%C3%A9_P%C3%A9rec_Cannes_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/01/Marie-Jos%C3%A9_P%C3%A9rec_Cannes_2016_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/45/Marie-Jos%C3%A9_of_Belgium_aged_9_-_Project_Gutenberg_etext_20521.png",
	],
	"Renaud Lavillenie": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1d/Renaud_Lavillenie_Berlin_2009.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/6/6c/Renaud_Lavillenie_Istanbul_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/bf/Renaud_Lavillenie_G%C3%B6teborg_2013.jpg",
	],
	"Florence Griffith-Joyner": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/President_Ronald_Reagan_Greeting_Florence_Griffith_Joyner_of_The_United_States_Olympic_Team_in_The_Oval_Office_-_DPLA_-_80c2b6323f406616bcad1ab77b7a176e.jpg/960px-President_Ronald_Reagan_Greeting_Florence_Griffith_Joyner_of_The_United_States_Olympic_Team_in_The_Oval_Office_-_DPLA_-_80c2b6323f406616bcad1ab77b7a176e.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/79/Florence_Griffith_Joyner_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Florence_Nightingale._Coloured_lithograph._Wellcome_V0006579.jpg/960px-Florence_Nightingale._Coloured_lithograph._Wellcome_V0006579.jpg",
	],
	"Carl Lewis": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Carl_Lewis_2006.jpg/960px-Carl_Lewis_2006.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Carl_Lewis_2011_Shankbone.JPG/960px-Carl_Lewis_2011_Shankbone.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/5/55/Carl_Lewis.jpg",
	],
	"Allyson Felix": [
		"https://upload.wikimedia.org/wikipedia/commons/e/ea/Allyson_Felix_2_Daegu_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/5e/Allyson_Felix_2_Daegu_2011_cropped.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/f2/Allyson_Felix_2_Daegu_2011_cropped-2.jpg",
	],
	"Mo Farah": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mo_Farah_celebrates_double_1.jpg/960px-Mo_Farah_celebrates_double_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/18/Mo_Farah_Helsinki_2012-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Mo_Farah_-_Victory_Parade.jpg/960px-Mo_Farah_-_Victory_Parade.jpg",
	],
	"Christine Arron": [
		"https://upload.wikimedia.org/wikipedia/commons/f/ff/Christine_Arron.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Osaka07_D2M_Christine_Arron.jpg/960px-Osaka07_D2M_Christine_Arron.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/27/Christine_Arron_-_2010.jpg",
	],
	"Lewis Hamilton": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Lewis_Hamilton_2008_2_amk.jpg/960px-Lewis_Hamilton_2008_2_amk.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Lewis_Hamilton_%2833854091961%29.jpg/960px-Lewis_Hamilton_%2833854091961%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lewis_Hamilton_leads_Fernando_Alonso_%287455541582%29.jpg/960px-Lewis_Hamilton_leads_Fernando_Alonso_%287455541582%29.jpg",
	],
	"Michael Schumacher": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Michael_Schumacher_Ferrari_2004.jpg/960px-Michael_Schumacher_Ferrari_2004.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Michael_Schumacher_2010_Malaysia_2nd_Free_Practice.jpg/960px-Michael_Schumacher_2010_Malaysia_2nd_Free_Practice.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Michael_Schumacher_1992_helmet_top_2019_Michael_Schumacher_Private_Collection.jpg/960px-Michael_Schumacher_1992_helmet_top_2019_Michael_Schumacher_Private_Collection.jpg",
	],
	"Ayrton Senna": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Ayrton_Senna_1984.jpg/960px-Ayrton_Senna_1984.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Ayrton_Senna_with_a_Dog.jpg/960px-Ayrton_Senna_with_a_Dog.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/7b/Ayrton_Senna_8_-_Cropped.jpg",
	],
	"Alain Prost": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Alain_Prost_1991_United_States_GP.jpg/960px-Alain_Prost_1991_United_States_GP.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2d/Alain_Prost_%28McLaren_Honda%29%2C_1988.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alain_Prost_2009_MEDEF_cropped.jpg/960px-Alain_Prost_2009_MEDEF_cropped.jpg",
	],
	"Max Verstappen": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Max_Verstappen_-_Circuit_Zandvoort_-_Jumbo_Race_Dagen_2018_Driven_by_Max_Verstappen_%2828406626818%29.jpg/960px-Max_Verstappen_-_Circuit_Zandvoort_-_Jumbo_Race_Dagen_2018_Driven_by_Max_Verstappen_%2828406626818%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Max_Verstappen_-_Circuit_Zandvoort_-_Jumbo_Race_Dagen_2018_Driven_by_Max_Verstappen_%2828406623618%29.jpg/960px-Max_Verstappen_-_Circuit_Zandvoort_-_Jumbo_Race_Dagen_2018_Driven_by_Max_Verstappen_%2828406623618%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Max_Verstappen_-_Circuit_Zandvoort_-_Jumbo_Race_Dagen_2018_Driven_by_Max_Verstappen_%2828406626758%29.jpg/960px-Max_Verstappen_-_Circuit_Zandvoort_-_Jumbo_Race_Dagen_2018_Driven_by_Max_Verstappen_%2828406626758%29.jpg",
	],
	"Mike Tyson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Mike_Tyson_%288193230958%29.jpg/960px-Mike_Tyson_%288193230958%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Rider_with_Mike_Tyson_on_set_of_Liger.jpg/960px-Rider_with_Mike_Tyson_on_set_of_Liger.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Mike_Tyson_shows_off_his_3_championship_belts_after_knocking_out_Michael_Spinks.jpg/960px-Mike_Tyson_shows_off_his_3_championship_belts_after_knocking_out_Michael_Spinks.jpg",
	],
	"Teddy Riner": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1b/Teddy_Riner%2C_judoka.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/7f/Teddy_Riner_Cannes_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Rafael_Silva_perde_para_franc%C3%AAs_Teddy_Riner_no_jud%C3%B4_1037174-rj_mg_4336.jpg/960px-Rafael_Silva_perde_para_franc%C3%AAs_Teddy_Riner_no_jud%C3%B4_1037174-rj_mg_4336.jpg",
	],
	"Conor McGregor": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Conor_McGregor_2015.jpg/960px-Conor_McGregor_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/aa/Conor_McGregor.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2a/Conor_McGregor_2016.png",
	],
	"Khabib Nurmagomedov": [
		"https://upload.wikimedia.org/wikipedia/commons/8/80/Khabib_Nurmagomedov_2.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/MIESHA_TATE_BREAKS_DOWN_CONOR_MCGREGOR_VS_KHABIB_NURMAGOMEDOV_UFC_229_-_YouTube_-_0-46.jpg/960px-MIESHA_TATE_BREAKS_DOWN_CONOR_MCGREGOR_VS_KHABIB_NURMAGOMEDOV_UFC_229_-_YouTube_-_0-46.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Khabib_Nurmagomedov_in_Uzbekistan_%282020-12-01%29_01.jpg/960px-Khabib_Nurmagomedov_in_Uzbekistan_%282020-12-01%29_01.jpg",
	],
	"Manny Pacquiao": [
		"https://upload.wikimedia.org/wikipedia/commons/4/4f/Manny_Pacquiao.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/RP-C8988_-_AirAsia_Zest_-_Airbus_A320-232_-_Manny_Pacquiao_Livery_-_ICN_%2815853579103%29.jpg/960px-RP-C8988_-_AirAsia_Zest_-_Airbus_A320-232_-_Manny_Pacquiao_Livery_-_ICN_%2815853579103%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Manny_Pacquiao_with_Harry_Reid_and_Daniel_Inouye.jpg/960px-Manny_Pacquiao_with_Harry_Reid_and_Daniel_Inouye.jpg",
	],
	"Antoine Dupont": [
		"https://upload.wikimedia.org/wikipedia/commons/a/a8/Pierre_Antoine_Dupont-Chaumont_%281759-1838%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Castres_Olympique_-_Pr%C3%A9sentation_de_l%27%C3%A9quipe_2015-2016_-_Antoine_Dupont.jpg/960px-Castres_Olympique_-_Pr%C3%A9sentation_de_l%27%C3%A9quipe_2015-2016_-_Antoine_Dupont.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Antoine_Dupont_2017.jpg/960px-Antoine_Dupont_2017.jpg",
	],
	"Sébastien Chabal": [
		"https://upload.wikimedia.org/wikipedia/commons/4/42/S%C3%A9bastien_Chabal.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/S%C3%A9bastien_Chabal_1.jpg/960px-S%C3%A9bastien_Chabal_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/S%C3%A9bastien_Chabal_2006.jpg/960px-S%C3%A9bastien_Chabal_2006.jpg",
	],
	"Bernard Hinault": [
		"https://upload.wikimedia.org/wikipedia/commons/d/d6/Bernard_hinault.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bernard_Hinault_-_Crit%C3%A9rium_du_Dauphin%C3%A9_2012_-_Prologue_%282%29.jpg/960px-Bernard_Hinault_-_Crit%C3%A9rium_du_Dauphin%C3%A9_2012_-_Prologue_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bernard_Hinault_-_%C3%A0_Tarare_en_2013_%282%29.JPG/960px-Bernard_Hinault_-_%C3%A0_Tarare_en_2013_%282%29.JPG",
	],
	"Chris Froome": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Chris_Froome_London_2012_Olympic_Time_Trial_%281%29.jpg/960px-Chris_Froome_London_2012_Olympic_Time_Trial_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Chris_Froome_-_The_First_Man_to_Cycle_through_the_Eurotunnel_%2814593562145%29.jpg/960px-Chris_Froome_-_The_First_Man_to_Cycle_through_the_Eurotunnel_%2814593562145%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chris_Froome_-_The_First_Man_to_Cycle_through_the_Eurotunne_%2814406846669%29.jpg/960px-Chris_Froome_-_The_First_Man_to_Cycle_through_the_Eurotunne_%2814406846669%29.jpg",
	],
	"Michael Phelps": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Michael_Phelps_at_the_Michael_Phelps_Foundation_Golf_Classic_-_20100913.jpg/960px-Michael_Phelps_at_the_Michael_Phelps_Foundation_Golf_Classic_-_20100913.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/af/Michael_Phelps_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/London_2012_Michael_Phelps.jpg/960px-London_2012_Michael_Phelps.jpg",
	],
	"Laure Manaudou": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e7/Laure_Manaudou_dsc03674.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/62/Laure_Manaudou_dsc03675.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8d/Image_Laure_Manaudou.png",
	],
	"Simone Biles": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Simone_Biles_Rio_2016d.jpg/960px-Simone_Biles_Rio_2016d.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Simone_Biles%2C_na_prova_final_da_trave_nos_Jogos_Ol%C3%ADmpicos_Rio_2016.jpg/960px-Simone_Biles%2C_na_prova_final_da_trave_nos_Jogos_Ol%C3%ADmpicos_Rio_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Travis_Kelce%2C_Simone_Biles%2C_and_Dr._Oz_%2848250696477%29.jpg/960px-Travis_Kelce%2C_Simone_Biles%2C_and_Dr._Oz_%2848250696477%29.jpg",
	],
	"Nadia Comăneci": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b7/Nadia_Com%C4%83neci_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/5c/Nadia_Com%C4%83neci_Emilia_Eberle.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sala_de_Gimnastic%C4%83_%E2%80%9ENadia_Com%C4%83neci%E2%80%99%E2%80%99_One%C8%99ti_4.jpg/960px-Sala_de_Gimnastic%C4%83_%E2%80%9ENadia_Com%C4%83neci%E2%80%99%E2%80%99_One%C8%99ti_4.jpg",
	],
	"Tiger Woods": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Tiger_Woods_conference.jpg/960px-Tiger_Woods_conference.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jessica_Simpson%2C_Tiger_Woods_%26_Tony_Romo_at_Earl_D._Woods_Memorial_Pro-Am_2009-07-01.jpg/960px-Jessica_Simpson%2C_Tiger_Woods_%26_Tony_Romo_at_Earl_D._Woods_Memorial_Pro-Am_2009-07-01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/US_Navy_040303-N-5319A-011_Professional_golfer_Tiger_Woods_poses_in_the_admiral%27s_chair.jpg/960px-US_Navy_040303-N-5319A-011_Professional_golfer_Tiger_Woods_poses_in_the_admiral%27s_chair.jpg",
	],
	"Tony Hawk": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Tony_Hawk_Ride_-_The_Engadget_Show_2009.jpg/960px-Tony_Hawk_Ride_-_The_Engadget_Show_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Tony_Hawk._Until_the_Wheels_Fall_Off_-_SXSW_2022_%2851989005517%29.jpg/960px-Tony_Hawk._Until_the_Wheels_Fall_Off_-_SXSW_2022_%2851989005517%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Tony_Hawk._Until_the_Wheels_Fall_Off_-_SXSW_2022_%2851990291339%29.jpg/960px-Tony_Hawk._Until_the_Wheels_Fall_Off_-_SXSW_2022_%2851990291339%29.jpg",
	],
	"Surya Bonaly": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Xtraice.Surya_Bonaly_215_%285223411862%29.jpg/960px-Xtraice.Surya_Bonaly_215_%285223411862%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/66/Surya_Bonaly%2C_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/1a/Surya_Bonaly.jpg",
	],
	"Nikola Karabatić": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Nikola_Karabati%C4%87_%28Montpellier_HB%29_-_Handball_player_of_France_%283%29.jpg/960px-Nikola_Karabati%C4%87_%28Montpellier_HB%29_-_Handball_player_of_France_%283%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Nikola_Karabati%C4%87_%28Montpellier_HB%29_-_Handball_player_of_France_%285%29.jpg/960px-Nikola_Karabati%C4%87_%28Montpellier_HB%29_-_Handball_player_of_France_%285%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Nikola_Karabati%C4%87.JPG/960px-Nikola_Karabati%C4%87.JPG",
	],
	"Earvin Ngapeth": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Earvin_NGAPETH.JPG/960px-Earvin_NGAPETH.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/7/71/Earvin_Ngapeth_%28Legavolley_2017%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2e/Earvin_Ngapeth_%28Legavolley_2018%29.jpg",
	],
	"Martin Fourcade": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Martin_Fourcade.JPG/960px-Martin_Fourcade.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Martin_Fourcade_Kontiolahti_2010.jpg/960px-Martin_Fourcade_Kontiolahti_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/2012-12-07_Biathlon_Hochfilzen_SP_H_155_Martin_Fourcade_%28FRA%29.jpg/960px-2012-12-07_Biathlon_Hochfilzen_SP_H_155_Martin_Fourcade_%28FRA%29.jpg",
	],
	"Marie Bochet": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Marie_Bochet_slalom.JPG/960px-Marie_Bochet_slalom.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Marie_Bochet_GS_1.JPG/960px-Marie_Bochet_GS_1.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Marie_Bochet_and_Andrea_Rothfuss_GS.JPG/960px-Marie_Bochet_and_Andrea_Rothfuss_GS.JPG",
	],
	"Didier Deschamps": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b9/Didier_Deschamps.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Didier_Deschamps_2011.jpeg/960px-Didier_Deschamps_2011.jpeg",
		"https://upload.wikimedia.org/wikipedia/commons/4/44/Didier_Deschamps_2018.jpg",
	],
	"Fabien Barthez": [
		"https://upload.wikimedia.org/wikipedia/commons/6/67/Fabien_Barthez.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/f9/Fabien_Barthez_%28cropped%29.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/e/e5/Fabien_Barthez_on_circuit_at_Nogaro_%282358758288%29.jpg",
	],
	"Leonardo DiCaprio": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Leonardo_DiCaprio_crop.jpg/960px-Leonardo_DiCaprio_crop.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Secretary_Kerry_Speaks_With_American_Actor_Leonardo_DiCaprio_in_Paris_About_an_Environmental_Documentary_the_Actor_is_Making_%2823294588040%29.jpg/960px-Secretary_Kerry_Speaks_With_American_Actor_Leonardo_DiCaprio_in_Paris_About_an_Environmental_Documentary_the_Actor_is_Making_%2823294588040%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Leonardo_DiCaprio_%2829736977296%29.jpg/960px-Leonardo_DiCaprio_%2829736977296%29.jpg",
	],
	"Brad Pitt": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Brad_Pitt_PF.jpg/960px-Brad_Pitt_PF.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/20/Angelina_Jolie_Brad_Pitt_Cannes.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/War_Machine_Japan_Premiere_Red_Carpet-_Brad_Pitt_%2838393320681%29.jpg/960px-War_Machine_Japan_Premiere_Red_Carpet-_Brad_Pitt_%2838393320681%29.jpg",
	],
	"Tom Cruise": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tom_Cruise_and_Mimi_Rogers_in_1989.jpg/960px-Tom_Cruise_and_Mimi_Rogers_in_1989.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mimi_Roger_and_Tom_Cruise_arrive_at_the_61st_Annual_Academy_Awards%2C_1989.jpg/960px-Mimi_Roger_and_Tom_Cruise_arrive_at_the_61st_Annual_Academy_Awards%2C_1989.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Tom_Cruise_arrives_at_the_61st_Annual_Academy_Awards%2C_1989.jpg/960px-Tom_Cruise_arrives_at_the_61st_Annual_Academy_Awards%2C_1989.jpg",
	],
	"Tom Hanks": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/1989_Tom_Hanks.jpg/960px-1989_Tom_Hanks.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tom_Hanks_2016.jpg/960px-Tom_Hanks_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tom_Hanks_TIFF_2019.jpg/960px-Tom_Hanks_TIFF_2019.jpg",
	],
	"Robert Downey Jr.": [
		"https://upload.wikimedia.org/wikipedia/commons/6/69/Robert_Downey_Jr._2011_AA.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b2/Robert_Downey_Jr_SDCC_2009_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Robert_Downey_Jr_Wearing_Nice_Suit_%2815164150481%29.jpg/960px-Robert_Downey_Jr_Wearing_Nice_Suit_%2815164150481%29.jpg",
	],
	"Scarlett Johansson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Scarlett_Johansson_in_Kuwait_02.jpg/960px-Scarlett_Johansson_in_Kuwait_02.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/db/Scarlett_Johansson_2003.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a2/Scarlett_Johansson_3%2C_2010.jpg",
	],
	"Meryl Streep": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Meryl_Streep_%26_Kurt_Russell_61st_Academy_Awards.jpg/960px-Meryl_Streep_%26_Kurt_Russell_61st_Academy_Awards.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b9/Meryl_Streep_%282071470089%29_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Alec_Baldwin%2C_Meryl_Streep%2C_Josh_Wood_15th_Annual_Screen_Actors_Guild_Awards_2.jpg/960px-Alec_Baldwin%2C_Meryl_Streep%2C_Josh_Wood_15th_Annual_Screen_Actors_Guild_Awards_2.jpg",
	],
	"Angelina Jolie": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Angelina_Jolie_by_Gage_Skidmore.jpg/960px-Angelina_Jolie_by_Gage_Skidmore.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Esztergom_-_Angelina_Jolie_-_Brad_Pitt.JPG/960px-Esztergom_-_Angelina_Jolie_-_Brad_Pitt.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Angelina_Jolie_%40_69th_Annual_Golden_Globes_Awards.jpg/960px-Angelina_Jolie_%40_69th_Annual_Golden_Globes_Awards.jpg",
	],
	"Denzel Washington": [
		"https://upload.wikimedia.org/wikipedia/commons/c/ca/Denzel_Washington_cropped.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/3e/Denzel_Washington.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Denzel_Washington_%282106641898%29.jpg/960px-Denzel_Washington_%282106641898%29.jpg",
	],
	"Will Smith": [
		"https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUycnlpN3R2MG16ZWR3dnNtOTk3dm91ODF4cjl1MDZwanUzc2V0eHd2aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CnRmpfxlPutVAFChvm/giphy.gif",
		"https://fr.web.img6.acsta.net/c_310_420/pictures/20/01/16/09/48/3201727.jpg",
		"https://image.tmdb.org/t/p/w500/8TlKqbXYgHmmaEoPBJ7djJ8Rxxa.jpg",
	],
	"Johnny Depp": [
		"https://upload.wikimedia.org/wikipedia/commons/4/41/Johnny_Depp_%28July_2009%29_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/88/Pen%C3%A9lope_Cruz_and_Johnny_Depp_-_Cannes_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Johnny_Depp_2011%2C_2.jpg/960px-Johnny_Depp_2011%2C_2.jpg",
	],
	"Natalie Portman": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Natalie_Portman_at_the_TIFF_2009-01.jpg/960px-Natalie_Portman_at_the_TIFF_2009-01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flickr_-_Josh_Jensen_-_Natalie_Portman_-_Red_Carpet_Arrival_%283928050232%29.jpg/960px-Flickr_-_Josh_Jensen_-_Natalie_Portman_-_Red_Carpet_Arrival_%283928050232%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Natalie_Portman_-_Film_Independent%27s_Spirit_Awards.jpg/960px-Natalie_Portman_-_Film_Independent%27s_Spirit_Awards.jpg",
	],
	"Jennifer Lawrence": [
		"https://upload.wikimedia.org/wikipedia/commons/3/38/Jennifer_Lawrence_-_TIFF_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Jennifer_Lawrence_at_214._Wetten%2C_dass.._show_in_Graz%2C_8._Nov._2014.jpg/960px-Jennifer_Lawrence_at_214._Wetten%2C_dass.._show_in_Graz%2C_8._Nov._2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jennifer_Lawrence_at_214._Wetten%2C_dass.._show_in_Graz%2C_8._Nov._2014_02.jpg/960px-Jennifer_Lawrence_at_214._Wetten%2C_dass.._show_in_Graz%2C_8._Nov._2014_02.jpg",
	],
	"Emma Watson": [
		"https://fr.web.img3.acsta.net/img/11/f3/11f3a37627c1ed6e362066e4d0b16dd7.jpg",
		"https://image.tmdb.org/t/p/w500/A14lLCZYDhfYdBa0fFRpwMDiwRN.jpg",
	],
	"Emma Stone": [
		"https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_FMjpg_UX1000_.jpg",
	],
	"Margot Robbie": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SDCC_2015_-_Viola_Davis%2C_Margot_Robbie%2C_Will_Smith_%26_David_Ayer_%2819520936520%29.jpg/960px-SDCC_2015_-_Viola_Davis%2C_Margot_Robbie%2C_Will_Smith_%26_David_Ayer_%2819520936520%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/67/Margot_Robbie_SDCC_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Margot_Robbie_%2827983770104%29.jpg/960px-Margot_Robbie_%2827983770104%29.jpg",
	],
	"Zendaya Coleman": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/ZendayaColemanOct2010.jpg/960px-ZendayaColemanOct2010.jpg",
		"https://media.vogue.fr/photos/6a50306ff53e8c77a36f483b/2:3/w_2560%2Cc_limit/2285248074",
		"https://upload.wikimedia.org/wikipedia/commons/5/5a/Zendaya-byPhilipRomano.jpg",
	],
	"Timothée Chalamet": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Timoth%C3%A9e_Chalamet_Berlinale_2017.jpg/960px-Timoth%C3%A9e_Chalamet_Berlinale_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a9/Interview_with_Timoth%C3%A9e_Chalamet%2C_2019.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Timoth%C3%A9e_Chalamet_2024.jpg/960px-Timoth%C3%A9e_Chalamet_2024.jpg",
	],
	"Ryan Gosling": [
		"https://upload.wikimedia.org/wikipedia/commons/d/d2/Ryan_Gosling_TIFF_Drive_premiere.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ryan_Gosling_TIFF_2%2C_2011.jpg/960px-Ryan_Gosling_TIFF_2%2C_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Ryan_Gosling_%2816437257783%29.jpg/960px-Ryan_Gosling_%2816437257783%29.jpg",
	],
	"Ryan Reynolds": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ryan_Reynolds%2C_2010_Buried_Premiere.jpg/960px-Ryan_Reynolds%2C_2010_Buried_Premiere.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Ryan_Reynolds_at_TIFF_2014.jpg/960px-Ryan_Reynolds_at_TIFF_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ryan_Reynolds_2014_TIFF_The_Voices_Premiere.jpg/960px-Ryan_Reynolds_2014_TIFF_The_Voices_Premiere.jpg",
	],
	"Chris Hemsworth": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5d/Chris_Hemsworth_2010_Comic-Con_2_Cropped.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Chris_Hemsworth_%287400861508%29.jpg/960px-Chris_Hemsworth_%287400861508%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Chris_Hemsworth_%2835267473631%29.jpg/960px-Chris_Hemsworth_%2835267473631%29.jpg",
	],
	"Chris Evans": [
		"https://upload.wikimedia.org/wikipedia/commons/4/49/Chris_Evans_Comic-Con_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Chris_Evans_-_Captain_America_2_press_conference.jpg/960px-Chris_Evans_-_Captain_America_2_press_conference.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/71/Chris_Evans_2010.jpg",
	],
	"Dwayne Johnson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dwayne_Johnson_at_Madame_Tussauds_London.jpg/960px-Dwayne_Johnson_at_Madame_Tussauds_London.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Dwayne_Johnson%2C_Israel_Folau_%2814457790905%29.jpg/960px-Dwayne_Johnson%2C_Israel_Folau_%2814457790905%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Dwayne_Johnson_%288557345508%29.jpg/960px-Dwayne_Johnson_%288557345508%29.jpg",
	],
	"Keanu Reeves": [
		"https://fr.web.img5.acsta.net/c_310_420/pictures/17/02/06/17/01/343859.jpg",
		"https://hips.hearstapps.com/hmg-prod/images/keanu-reeves-9454211-1-402.jpg",
	],
	"Hugh Jackman": [
		"https://upload.wikimedia.org/wikipedia/commons/8/82/Hugh_Jackman_navy.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Hugh_Jackman_2010.jpg/960px-Hugh_Jackman_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Hugh_Jackman_3%2C_2012.jpg/960px-Hugh_Jackman_3%2C_2012.jpg",
	],
	"Matt Damon": [
		"https://upload.wikimedia.org/wikipedia/commons/8/83/Karl_Meersman_Matt_Damon_caricature.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Matt_Damon_66%C3%A8me_Festival_de_Venise_%28Mostra%29_6.jpg/960px-Matt_Damon_66%C3%A8me_Festival_de_Venise_%28Mostra%29_6.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Matt_Damon_66%C3%A8me_Festival_de_Venise_%28Mostra%29_17.jpg/960px-Matt_Damon_66%C3%A8me_Festival_de_Venise_%28Mostra%29_17.jpg",
	],
	"Ben Affleck": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/US_Navy_031222-N-9742R-002_Aboard_USS_Enterprise_%28CVN_65%29%2C_Commanding_Officer_Capt._Eric_C._Neidlinger%2C_left%2C_shares_a_laugh_with_Academy_Award_winning_actor_Ben_Affleck%2C_who_enjoys_the_view_from_the_Captain%27s_chair.jpg/960px-thumbnail.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/73/Diego_Fuentes_Ben_Affleck.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ben_Affleck_2012_%282%29_%28cropped%29.jpg/960px-Ben_Affleck_2012_%282%29_%28cropped%29.jpg",
	],
	"George Clooney": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/George_Clooney-7_The_Men_Who_Stare_at_Goats_TIFF09.jpg/960px-George_Clooney-7_The_Men_Who_Stare_at_Goats_TIFF09.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/George_Clooney_66%C3%A8me_Festival_de_Venise_%28Mostra%29_3Alt1.jpg/960px-George_Clooney_66%C3%A8me_Festival_de_Venise_%28Mostra%29_3Alt1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/09/George_Clooney_Waving_Closeup_Tiff_%286145896272%29.jpg",
	],
	"Julia Roberts": [
		"https://upload.wikimedia.org/wikipedia/commons/6/66/Julia_Roberts_at_Incirlik.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/ec/Julia_Roberts_and_Judy_Biggert_at_Capitol_Hill.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Julia_Roberts_2011_Shankbone_3.JPG/960px-Julia_Roberts_2011_Shankbone_3.JPG",
	],
	"Sandra Bullock": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Sandra_Bullock_at_2010_Razzies_adjusted.jpg/960px-Sandra_Bullock_at_2010_Razzies_adjusted.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sandra_Bullock_2013_Gravity.png/960px-Sandra_Bullock_2013_Gravity.png",
		"https://upload.wikimedia.org/wikipedia/commons/f/f0/Les_chaussures_que_porte_Sandra_Bullock_dans_le_film_The_Blind_Side_%28colletion_personnelle%29_00.jpg",
	],
	"Nicole Kidman": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5e/Nicole_Kidman%28CannesRed_carpet%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/47/Nicole_Kidman.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Nicole_Kidman_7.jpg/960px-Nicole_Kidman_7.jpg",
	],
	"Charlize Theron": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Charlize_Theron_%286852646436%29.jpg/960px-Charlize_Theron_%286852646436%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Charlize_Theron_by_Gage_Skidmore_2.jpg/960px-Charlize_Theron_by_Gage_Skidmore_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Charlize_Theron_%2835373635784%29.jpg/960px-Charlize_Theron_%2835373635784%29.jpg",
	],
	"Cate Blanchett": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Cate_Blanchett_at_the_Tropfest_Opens_%282012%29_5.jpg/960px-Cate_Blanchett_at_the_Tropfest_Opens_%282012%29_5.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/9/97/Cate_Blanchett_Cannes_2015_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/52/Flickr_-_Siebbi_-_Cate_Blanchett_%28cropped%29.jpg",
	],
	"Anne Hathaway": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Anne_Hathaway_2011.jpg/960px-Anne_Hathaway_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8e/Anne_Hathaway_TIFF_2008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Anne_Hathaway_%40_2018.09.15_Human_Rights_Campaign_National_Dinner%2C_Washington%2C_DC_USA_06195_%2843805106995%29.jpg/960px-Anne_Hathaway_%40_2018.09.15_Human_Rights_Campaign_National_Dinner%2C_Washington%2C_DC_USA_06195_%2843805106995%29.jpg",
	],
	"Viola Davis": [
		"https://upload.wikimedia.org/wikipedia/commons/7/72/Viola_Davis_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Viola_Davis_%2827983785894%29.jpg/960px-Viola_Davis_%2827983785894%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/SDCC_2015_-_David_Ayer_%26_Viola_Davis_%2819521093010%29_%28cropped%29.jpg/960px-SDCC_2015_-_David_Ayer_%26_Viola_Davis_%2819521093010%29_%28cropped%29.jpg",
	],
	"Lupita Nyong'o": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Lupita_Nyong%27o%2C_Michael_B._Jordan_%26_Danai_Gurira_%2828635045805%29.jpg/960px-Lupita_Nyong%27o%2C_Michael_B._Jordan_%26_Danai_Gurira_%2828635045805%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Lupita_Nyong%27o_%2828350595420%29.jpg/960px-Lupita_Nyong%27o_%2828350595420%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Lupita_Nyong%27o_by_Gage_Skidmore_3.jpg/960px-Lupita_Nyong%27o_by_Gage_Skidmore_3.jpg",
	],
	"Zoe Saldaña": [
		"https://upload.wikimedia.org/wikipedia/commons/d/d5/Zoe_Salda%C3%B1a_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Jon_Landau%2C_Sam_Worthington%2C_Zoe_Salda%C3%B1a%2C_James_Cameron%2C_Sigourney_Weaver_%26_Stephen_Lang_%2852562510602%29.jpg/960px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Jon_Landau%2C_Sam_Worthington%2C_Zoe_Salda%C3%B1a%2C_James_Cameron%2C_Sigourney_Weaver_%26_Stephen_Lang_%2852562510602%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Avatar_The_Way_of_Water_Tokyo_Press_Conference_Jon_Landau%2C_Sam_Worthington%2C_Zoe_Salda%C3%B1a%2C_James_Cameron%2C_Sigourney_Weaver_%26_Stephen_Lang_%2852562966421%29.jpg/960px-Avatar_The_Way_of_Water_Tokyo_Press_Conference_Jon_Landau%2C_Sam_Worthington%2C_Zoe_Salda%C3%B1a%2C_James_Cameron%2C_Sigourney_Weaver_%26_Stephen_Lang_%2852562966421%29.jpg",
	],
	"Gal Gadot": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SDCC_2015_-_Gal_Gadot_%2819712252185%29.jpg/960px-SDCC_2015_-_Gal_Gadot_%2819712252185%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/SDCC_2015_-_Gal_Gadot_%2819524051538%29_%28cropped%29.jpg/960px-SDCC_2015_-_Gal_Gadot_%2819524051538%29_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Patty_Jenkins_%26_Gal_Gadot_%2828561067956%29.jpg/960px-Patty_Jenkins_%26_Gal_Gadot_%2828561067956%29.jpg",
	],
	"Chris Pratt": [
		"https://upload.wikimedia.org/wikipedia/commons/5/54/Chris_Pratt_and_Anna_Faris.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Michael_Rooker_%26_Chris_Pratt_%2828556059642%29.jpg/960px-Michael_Rooker_%26_Chris_Pratt_%2828556059642%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Chris_Pratt_%26_Zoe_Saldana_%2828046741463%29.jpg/960px-Chris_Pratt_%26_Zoe_Saldana_%2828046741463%29.jpg",
	],
	"Idris Elba": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Venant_Mambumina_Imhotep_with_Idris_Elba.JPG/960px-Venant_Mambumina_Imhotep_with_Idris_Elba.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Idris_Elba_DJ.jpg/960px-Idris_Elba_DJ.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Idris_Elba-4671.jpg/960px-Idris_Elba-4671.jpg",
	],
	"Daniel Craig": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Daniel_Craig_McCallum_by_The_Brady_National_Photographic_Art_Gallery.jpg/960px-Daniel_Craig_McCallum_by_The_Brady_National_Photographic_Art_Gallery.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Daniel_Craig_CABP_2011.jpg/960px-Daniel_Craig_CABP_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/73/Daniel_Craig_Millennium_Paris_2012.jpg",
	],
	"Pierce Brosnan": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pierce_Brosnan_Berlinale_2014_-_02.jpg/960px-Pierce_Brosnan_Berlinale_2014_-_02.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8b/PierceBrosnanSept2013TIFF.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/ab/Pierce_Brosnan_Deauville_2014.jpg",
	],
	"Samuel L. Jackson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Samuel_L._Jackson_2011_Independent_Spirit_Awards_3.jpg/960px-Samuel_L._Jackson_2011_Independent_Spirit_Awards_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Samuel_L._Jackson_-_Captain_America_2_press_conference.jpg/960px-Samuel_L._Jackson_-_Captain_America_2_press_conference.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Kong-_Skull_Island_Japan_Premiere_Red_Carpet-_Samuel_L._Jackson_%2837250948502%29.jpg/960px-Kong-_Skull_Island_Japan_Premiere_Red_Carpet-_Samuel_L._Jackson_%2837250948502%29.jpg",
	],
	"Christian Bale": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Christian_Bale-7767.jpg/960px-Christian_Bale-7767.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Christian_bale_%2847966302342%29.jpg/960px-Christian_bale_%2847966302342%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/TIFF_2019_christian_bale_%2848719385038%29.jpg/960px-TIFF_2019_christian_bale_%2848719385038%29.jpg",
	],
	"Joaquin Phoenix": [
		"https://upload.wikimedia.org/wikipedia/commons/c/c3/Joaquin_Phoenix_Cannes_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Joaquin_Phoenix_red_carpet_at_76._Venice_Film_Festival.jpg/960px-Joaquin_Phoenix_red_carpet_at_76._Venice_Film_Festival.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Joaquin_Phoenix-2184.jpg/960px-Joaquin_Phoenix-2184.jpg",
	],
	"Jake Gyllenhaal": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5a/Gemma_Arterton_and_Jake_Gyllenhaal_11_May_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jake_Gyllenhaal_%28Berlinale_2012%29.jpg/960px-Jake_Gyllenhaal_%28Berlinale_2012%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Jake_Gyllenhaal_Toronto_International_Film_Festival_2013.jpg/960px-Jake_Gyllenhaal_Toronto_International_Film_Festival_2013.jpg",
	],
	"Mark Ruffalo": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Yusuke_Iseya%2C_Yoshino_Kimura%2C_Danny_Glover_%28atr%C3%A1s_do_cara%29%2C_%3F%2C_Julianne_Moore%2C_Mark_Ruffalo..jpg/960px-Yusuke_Iseya%2C_Yoshino_Kimura%2C_Danny_Glover_%28atr%C3%A1s_do_cara%29%2C_%3F%2C_Julianne_Moore%2C_Mark_Ruffalo..jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mark_Ruffalo_%28Berlin_Film_Festival_2010%29_2.jpg/960px-Mark_Ruffalo_%28Berlin_Film_Festival_2010%29_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mark_Ruffalo_TIFF_2008.jpg/960px-Mark_Ruffalo_TIFF_2008.jpg",
	],
	"Jeremy Renner": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Jeremy_Renner_6%2C_2012.jpg/960px-Jeremy_Renner_6%2C_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Jeremy_Renner_2%2C_2013.jpg/960px-Jeremy_Renner_2%2C_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Jeremy_Renner_5%2C_2013.jpg/960px-Jeremy_Renner_5%2C_2013.jpg",
	],
	"Tom Holland": [
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREijpBTwAFk8fUVGtG381mi9teC6Ll1BRfEAzm48-s_w&s=10",
		"https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2f/Tom_Holland.jpg/revision/latest/scale-to-width-down/1200?cb=20220213015022",
		"https://numero.com/wp-content/uploads/2020/09/Tom-Holland-.jpg",
	],
	"Andrew Garfield": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flickr_-_csztova_-_Andrew_Garfield_-_TIFF_09%27_%281%29.jpg/960px-Flickr_-_csztova_-_Andrew_Garfield_-_TIFF_09%27_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Andrew_Garfield_Comic-Con%2C_2011.jpg/960px-Andrew_Garfield_Comic-Con%2C_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Andrew_Garfield_Comic-Con_3%2C_2011.jpg/960px-Andrew_Garfield_Comic-Con_3%2C_2011.jpg",
	],
	"Michael B. Jordan": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Sylvester_Stallone%2C_Tessa_Thompson%2C_and_Michael_B._Jordan_promoting_Creed_at_the_Philadelphia_Art_Museum.JPG/960px-Sylvester_Stallone%2C_Tessa_Thompson%2C_and_Michael_B._Jordan_promoting_Creed_at_the_Philadelphia_Art_Museum.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/SDCC_2015_-_Kate_Mara_%26_Michael_B._Jordan_%2819747774492%29.jpg/960px-SDCC_2015_-_Kate_Mara_%26_Michael_B._Jordan_%2819747774492%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Michael_B._Jordan_by_Gage_Skidmore_3.jpg/960px-Michael_B._Jordan_by_Gage_Skidmore_3.jpg",
	],
	"Chadwick Boseman": [
		"https://upload.wikimedia.org/wikipedia/commons/b/bd/Chadwick_Boseman_by_Sachyn_Mital.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Chadwick_Boseman_signing_at_the_2016_San_Diego_Comic-Con_2.jpg/960px-Chadwick_Boseman_signing_at_the_2016_San_Diego_Comic-Con_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Chadwick_Boseman_%2828018643703%29.jpg/960px-Chadwick_Boseman_%2828018643703%29.jpg",
	],
	"Denis Villeneuve": [
		"https://upload.wikimedia.org/wikipedia/commons/6/6e/Denis_Villeneuve%2C_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/ed/Denis_Villeneuve_Cannes_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Denis_Villeneuve_by_Gage_Skidmore.jpg/960px-Denis_Villeneuve_by_Gage_Skidmore.jpg",
	],
	"Christopher Nolan": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Christopher_Nolan_at_WonderCon_2010_2.JPG/960px-Christopher_Nolan_at_WonderCon_2010_2.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/0/01/Christopher_nolan.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/ca/Christopher_Nolan_and_Emma_Thomas.jpg",
	],
	"Steven Spielberg": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Museu_de_Cera_de_Barcelona_%28Steven_Spielberg%29.jpg/960px-Museu_de_Cera_de_Barcelona_%28Steven_Spielberg%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Steven_Spielberg_%2836057765641%29.jpg/960px-Steven_Spielberg_%2836057765641%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Steven_Spielberg_%2836057851611%29.jpg/960px-Steven_Spielberg_%2836057851611%29.jpg",
	],
	"Quentin Tarantino": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Quentin_Tarantino_y_Robert_Rodriguez.jpg/960px-Quentin_Tarantino_y_Robert_Rodriguez.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/cf/Quentin_Tarantino_Django_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/%C3%81trium_Filmsz%C3%ADnh%C3%A1z_-_Quentin_Tarantino_50_%283%29.JPG/960px-%C3%81trium_Filmsz%C3%ADnh%C3%A1z_-_Quentin_Tarantino_50_%283%29.JPG",
	],
	"Greta Gerwig": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Greta_Gerwig%2C_Adam_Brody%2C_Analeigh_Tipton_2011.jpg/960px-Greta_Gerwig%2C_Adam_Brody%2C_Analeigh_Tipton_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Greta_Gerwig_and_Bryan_Cranston_-_Isle_of_Dogs_-_Press_Conference.jpg/960px-Greta_Gerwig_and_Bryan_Cranston_-_Isle_of_Dogs_-_Press_Conference.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/MJK_08458_Greta_Gerwig_%28Berlinale_2018%29.jpg/960px-MJK_08458_Greta_Gerwig_%28Berlinale_2018%29.jpg",
	],
	"Sofia Coppola": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sofia_Coppola_2010_c.jpg/960px-Sofia_Coppola_2010_c.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/00/Sofia_Coppola_in_2003.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Virginie_Viard_filmed_by_Sofia_Coppola.jpg/960px-Virginie_Viard_filmed_by_Sofia_Coppola.jpg",
	],
	"Marion Cotillard": [
		"https://media.vogue.fr/photos/646d1bc648e9361769c7f7ea/2:3/w_2560%2Cc_limit/1492077732",
		"https://image.tmdb.org/t/p/w500/biitzOF0GffIqFYLyOPkoiaOngQ.jpg",
	],
	"Omar Sy": [
		"https://upload.wikimedia.org/wikipedia/commons/6/6b/Omar_Sy_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d0/Omar_Sy_2012_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e9/Omar_Sy_2012_3.jpg",
	],
	"Jean Dujardin": [
		"https://upload.wikimedia.org/wikipedia/commons/0/0c/Jean_Dujardin_Cannes_2011_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e1/Jean_Dujardin_et_les_soeurs_Lamy.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/db/Jean_Dujardin_C%C3%A9sars_2017_%28cropped%29.jpg",
	],
	"Audrey Tautou": [
		"https://upload.wikimedia.org/wikipedia/commons/d/d9/Audrey_Tautou_Cannes.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Audrey_Tautou_2011.jpg/960px-Audrey_Tautou_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e6/Audrey_Tautou_Cannes_2012.jpg",
	],
	"Léa Seydoux": [
		"https://upload.wikimedia.org/wikipedia/commons/4/41/L%C3%A9a_Seydoux%2C_Venice_Intl_Film_Festival%2C_2009_%28crop%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d5/L%C3%A9a_Seydoux_Cannes_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0b/L%C3%A9a_Seydoux_Ad%C3%A8le_Exarchopoulos_C%C3%A9sars_2014_6.jpg",
	],
	"Vincent Cassel": [
		"https://upload.wikimedia.org/wikipedia/commons/2/2d/Vincent_Cassel_Cannes.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/18/Vincent_Cassel_001.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/62/Vincent_Cassel_002.jpg",
	],
	"Isabelle Huppert": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Flickr_-_nicogenin_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29-_Isabelle_Huppert_%289%29.jpg/960px-Flickr_-_nicogenin_-_66%C3%A8me_Festival_de_Venise_%28Mostra%29-_Isabelle_Huppert_%289%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/81/Isabelle_Huppert_Cannes.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8b/Isabelle_Huppert_Cannes_2017.jpg",
	],
	"Gérard Depardieu": [
		"https://upload.wikimedia.org/wikipedia/commons/8/8b/G%C3%A9rard_Depardieu.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/G%C3%A9rard_Depardieu_art.JPG/960px-G%C3%A9rard_Depardieu_art.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/G%C3%A9rard_Depardieu_and_Vladimir_Putin%2C_Sochi%2C_Russia%2C_2013-01-06_2.jpeg/960px-G%C3%A9rard_Depardieu_and_Vladimir_Putin%2C_Sochi%2C_Russia%2C_2013-01-06_2.jpeg",
	],
	"Guillaume Canet": [
		"https://upload.wikimedia.org/wikipedia/commons/6/6a/Guillaume_Canet_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/f9/Guillaume_Canet_C%C3%A9sar_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c7/Guillaume_Canet_Cannes_2013.jpg",
	],
	"Eva Green": [
		"https://upload.wikimedia.org/wikipedia/commons/2/20/Eva_Green_at_the_Orange_British_Academy_Film_Awards.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/59/Eva_Green_%28Headshot%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Eva_Green_by_Gage_Skidmore.jpg/960px-Eva_Green_by_Gage_Skidmore.jpg",
	],
	"Dany Boon": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e2/Dany_Boon_C%C3%A9sars_2015_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d1/Dany_Boon_C%C3%A9sars_2015_4.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Entr%C3%A9e_en_sc%C3%A8ne_de_Dany_Boon.jpg/960px-Entr%C3%A9e_en_sc%C3%A8ne_de_Dany_Boon.jpg",
	],
	"Alain Chabat": [
		"https://upload.wikimedia.org/wikipedia/commons/a/a5/Alain_chabat_06-1999.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2d/Alain_Chabat_Mike_Myers.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a4/Alain_Chabat_Monica_Bellucci_C%C3%A9sars.jpg",
	],
	"Priyanka Chopra": [
		"https://upload.wikimedia.org/wikipedia/commons/7/75/Priyanka_Chopra_leaves_snapped_at_her_brother%27s_graduation_ceremony_%284%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/1f/Shahid_Kapoor%2C_Priyanka_Chopra_Promote_%27Teri_Meri_Kahaani%27_on_DLF_IPL%27s_Extraaa_innings_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/57/Priyanka_Chopra_at_Filmfare_Awards_2013.jpg",
	],
	"Shah Rukh Khan": [
		"https://upload.wikimedia.org/wikipedia/commons/8/88/Shah_Rukh_Khan_%26_Alia_Bhatt_on_The_Kapil_Sharma_Show.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Anoop_Sankar_with_Shah_Rukh_Khan_at_Kalyan_Jewellers_event.jpg/960px-Anoop_Sankar_with_Shah_Rukh_Khan_at_Kalyan_Jewellers_event.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c1/Shah_Rukh_Khan_in_2023_%281%29.jpg",
	],
	"Aamir Khan": [
		"https://upload.wikimedia.org/wikipedia/commons/d/d7/Aamir_Khan_at_92.7_BIG_FM_to_promote_Satyamev_Jayate_07.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/ba/Aamir_Khan_at_92.7_BIG_FM_to_promote_Satyamev_Jayate_03.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/dd/Aamir_Khan_at_92.7_BIG_FM_to_promote_Satyamev_Jayate_06.jpg",
	],
	"Deepika Padukone": [
		"https://upload.wikimedia.org/wikipedia/commons/8/8a/Deepika_Padukone_%28face%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/54/Deepika_Padukone_at_an_event.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/fe/Deepika_Padukone_unveils_the_new_Blackberry_Torch_06.jpg",
	],
	"Jackie Chan": [
		"https://upload.wikimedia.org/wikipedia/commons/4/4a/Jackie_Chan_2002-portrait_edited.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/US_Navy_021202-N-0271M-016_Jackie_Chan_tries_on_a_fighter_pilot%27s_helmet_with_night_vision_goggles_attached_during_his_visit_aboard_USS_Kitty_Hawk.jpg/960px-US_Navy_021202-N-0271M-016_Jackie_Chan_tries_on_a_fighter_pilot%27s_helmet_with_night_vision_goggles_attached_during_his_visit_aboard_USS_Kitty_Hawk.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/22/Jackie_Chan_2012_Jelgava_Chinese_zodiac.jpg",
	],
	"Jet Li": [
		"https://upload.wikimedia.org/wikipedia/commons/1/12/Jet_Li.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/73/Jet_Li_2006.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Jet_Li_Hero_Sword.jpg/960px-Jet_Li_Hero_Sword.jpg",
	],
	"Chow Yun-fat": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Chow_Yun_Fat_2.JPG/960px-Chow_Yun_Fat_2.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Avenue_of_Stars_-_Chow_Yun_Fat.jpg/960px-Avenue_of_Stars_-_Chow_Yun_Fat.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Chow_Yun_Fat_for_wiki.jpg/960px-Chow_Yun_Fat_for_wiki.jpg",
	],
	"Song Kang-ho": [
		"https://upload.wikimedia.org/wikipedia/commons/8/87/Song_Kang-Ho.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6f/Song_Kang-Ho_in_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/The_Actor_of_the_film%2C_Song_Kang-ho_receives_the_Silver_Peacock_%28Special_Jury_Award%29_for_Best_Director_of_the_film_%E2%80%98The_Throne%E2%80%99%2C_on_behalf_of_the_Director%2C_Mr._Lee_Joon-IK.jpg/960px-thumbnail.jpg",
	],
	"Bong Joon-ho": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Bong_Joon-Ho_at_2010_Independent_Spirit_Awards.jpg/960px-Bong_Joon-Ho_at_2010_Independent_Spirit_Awards.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/07/Bong_Joon-ho_Deauville_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Okja_Japan_Premiere-_Bong_Joon-ho_%2837867629864%29.jpg/960px-Okja_Japan_Premiere-_Bong_Joon-ho_%2837867629864%29.jpg",
	],
	"Ken Watanabe": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ken_Watanabe_01.jpg/960px-Ken_Watanabe_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flickr_-_Siebbi_-_Ken_Watanabe.jpg/960px-Flickr_-_Siebbi_-_Ken_Watanabe.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ken_Watanabe_2010.jpg/960px-Ken_Watanabe_2010.jpg",
	],
	"Penélope Cruz": [
		"https://upload.wikimedia.org/wikipedia/commons/0/08/Pen%C3%A9lope_Cruz_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/31/Pen%C3%A9lope_Cruz.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Pen%C3%A9lope_Cruz_TIFF_2012.jpg/960px-Pen%C3%A9lope_Cruz_TIFF_2012.jpg",
	],
	"Javier Bardem": [
		"https://upload.wikimedia.org/wikipedia/commons/c/ce/Javier_Bardem.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Javier_Bardem_2011_AA.jpg/960px-Javier_Bardem_2011_AA.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Premios_Goya_2018_-_Javier_Bardem.jpg/960px-Premios_Goya_2018_-_Javier_Bardem.jpg",
	],
	"Antonio Banderas": [
		"https://upload.wikimedia.org/wikipedia/commons/0/03/Chris_Miller%2C_Antonio_Banderas%2C_Salma_Hayek%2C_Jeffrey_Katzenberg%2C_Puss_in_Boots%2C_2011%2C_Australia-1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/37/Antonio_Banderas%2C_Puss_in_Boots%2C_2011%2C_Australia-14.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Antonio-Banderas-2014-1.jpg/960px-Antonio-Banderas-2014-1.jpg",
	],
	"Adrien Brody": [
		"https://upload.wikimedia.org/wikipedia/commons/0/06/Adrien_Brody_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Adrien_Brody_2011_Shankbone_%282%29.jpg/960px-Adrien_Brody_2011_Shankbone_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Adrien_Brody-61835.jpg/960px-Adrien_Brody-61835.jpg",
	],
	"Willem Dafoe": [
		"https://upload.wikimedia.org/wikipedia/commons/f/f1/Willem_Dafoe.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Willem_Dafoe_by_Sasha_Kargaltsev.jpg/960px-Willem_Dafoe_by_Sasha_Kargaltsev.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Willem_Dafoe_at_Lisbon_Film_Festival_2017_%28cropped_%26_retouched%29.jpg/960px-Willem_Dafoe_at_Lisbon_Film_Festival_2017_%28cropped_%26_retouched%29.jpg",
	],
	"Cillian Murphy": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cillian_Sheridan_Motherwell_-_1.jpg/960px-Cillian_Sheridan_Motherwell_-_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/20081207_Cillian_Vallely.jpg/960px-20081207_Cillian_Vallely.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Cillian_Murphy_at_Berlinale_2024.jpg/960px-Cillian_Murphy_at_Berlinale_2024.jpg",
	],
	"Florence Pugh": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Florence_Nightingale._Coloured_lithograph._Wellcome_V0006579.jpg/960px-Florence_Nightingale._Coloured_lithograph._Wellcome_V0006579.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Florence_Duomo_from_Michelangelo_hill.jpg/960px-Florence_Duomo_from_Michelangelo_hill.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Glory_of_Florentine_Saints_on_the_dome_in_San_Lorenzo_%28Florence%29.jpg/960px-Glory_of_Florentine_Saints_on_the_dome_in_San_Lorenzo_%28Florence%29.jpg",
	],
	"Anya Taylor-Joy": [
		"https://upload.wikimedia.org/wikipedia/commons/9/9a/Anya_Taylor-Joy_by_Gage_Skidmore.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b6/Anya_Taylor-Joy_by_Patrick_Lovell%2C_January_2019_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/84/Anya_Taylor-Joy_at_the_2025_Toronto_International_Film_Festival._09.jpg",
	],
	"Sydney Sweeney": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sydney_Harbour_Bridge_night.jpg/960px-Sydney_Harbour_Bridge_night.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/960px-Sydney_Opera_House_-_Dec_2008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Sydney_skyline_at_dusk_-_Dec_2008.jpg/960px-Sydney_skyline_at_dusk_-_Dec_2008.jpg",
	],
	"Austin Butler": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Austin_1800_Automatic_1969.jpg/960px-Austin_1800_Automatic_1969.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Cymbidium_Clarisse_Austin_%27Best_Pink%27_Flowers_2000px.JPG/960px-Cymbidium_Clarisse_Austin_%27Best_Pink%27_Flowers_2000px.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/2007-06-16_Austin_Mini_Cooper_%2804_-_Motor%29%2C_1293_cm%C2%B3%2C_Bj._1973.jpg/960px-2007-06-16_Austin_Mini_Cooper_%2804_-_Motor%29%2C_1293_cm%C2%B3%2C_Bj._1973.jpg",
	],
	"Barry Keoghan": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/S%C3%A8vres_-_Magot_-_Pajou%2C_buste_de_Madame_du_Barry_01.jpg/960px-S%C3%A8vres_-_Magot_-_Pajou%2C_buste_de_Madame_du_Barry_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/S%C3%A8vres_-_Magot_-_Pajou%2C_buste_de_Madame_du_Barry_05.jpg/960px-S%C3%A8vres_-_Magot_-_Pajou%2C_buste_de_Madame_du_Barry_05.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/S%C3%A8vres_-_Magot_-_Pajou%2C_buste_de_Madame_du_Barry_08.jpg/960px-S%C3%A8vres_-_Magot_-_Pajou%2C_buste_de_Madame_du_Barry_08.jpg",
	],
	"Pedro Pascal": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Pedro_Pascal_%26_Nikolaj_Coster-Waldau_%2814774374742%29.jpg/960px-Pedro_Pascal_%26_Nikolaj_Coster-Waldau_%2814774374742%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Pedro_Pascal_%2835315686953%29.jpg/960px-Pedro_Pascal_%2835315686953%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c8/Pedro_Pascal_on_street.jpg",
	],
	"Oscar Isaac": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Oscar_Isaac.JPG/960px-Oscar_Isaac.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Oscar_Isaac_by_Gage_Skidmore.jpg/960px-Oscar_Isaac_by_Gage_Skidmore.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/SDCC_2015_-_Oscar_Isaac_%2819684650221%29.jpg/960px-SDCC_2015_-_Oscar_Isaac_%2819684650221%29.jpg",
	],
	"Ana de Armas": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e4/Ana_de_Armas_when_she_was_a_member_of_the_cast_of_El_Internado.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Ryan_Gosling%2C_Harrison_Ford_%26_Ana_de_Armas_%2835809513410%29.jpg/960px-Ryan_Gosling%2C_Harrison_Ford_%26_Ana_de_Armas_%2835809513410%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Ana_de_Armas_2017_crop.jpg/960px-Ana_de_Armas_2017_crop.jpg",
	],
	"Millie Bobby Brown": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Millie_Bobby_Brown_2016.jpg/960px-Millie_Bobby_Brown_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Shannon_Purser%2C_Millie_Bobby_Brown_%26_Sadie_Sink_%2836046773952%29.jpg/960px-Shannon_Purser%2C_Millie_Bobby_Brown_%26_Sadie_Sink_%2836046773952%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Millie_Bobby_Brown_by_Gage_Skidmore_3.jpg/960px-Millie_Bobby_Brown_by_Gage_Skidmore_3.jpg",
	],
	"Finn Wolfhard": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Finn_Wolfhard_%2835409178473%29.jpg/960px-Finn_Wolfhard_%2835409178473%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Finn_Wolfhard_%2836078992291%29.jpg/960px-Finn_Wolfhard_%2836078992291%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Finn_Wolfhard_%2835409189693%29.jpg/960px-Finn_Wolfhard_%2835409189693%29.jpg",
	],
	"Elle Fanning": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Elle_Fanning_SDCC_2014.jpg/960px-Elle_Fanning_SDCC_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Elle_Fanning_2_SDCC_2014.jpg/960px-Elle_Fanning_2_SDCC_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elle_Fanning_%2844523410355%29.jpg/960px-Elle_Fanning_%2844523410355%29.jpg",
	],
	"Dakota Johnson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dakota_Johnson_%26_Cailee_Spaeny.png/960px-Dakota_Johnson_%26_Cailee_Spaeny.png",
		"https://upload.wikimedia.org/wikipedia/commons/2/21/Dakota_Johnson%2C_2018_%28cropped%29.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Jon_Hamm%2C_Dakota_Johnson_and_Jeff_Bridges.png/960px-Jon_Hamm%2C_Dakota_Johnson_and_Jeff_Bridges.png",
	],
	"Rami Malek": [
		"https://upload.wikimedia.org/wikipedia/commons/5/53/Rami_Malek.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Rami_Malek_%287585913404%29.jpg/960px-Rami_Malek_%287585913404%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Kyle_Bradstreet%2C_Adam_Penn%2C_Christian_Slater%2C_Sam_Esmail%2C_Chad_Hamilton_and_Rami_Malek_at_the_75th_Annual_Peabody_Awards_for_Mr._Robot.jpg/960px-Kyle_Bradstreet%2C_Adam_Penn%2C_Christian_Slater%2C_Sam_Esmail%2C_Chad_Hamilton_and_Rami_Malek_at_the_75th_Annual_Peabody_Awards_for_Mr._Robot.jpg",
	],
	"Michelle Yeoh": [
		"https://upload.wikimedia.org/wikipedia/commons/3/3b/Michelle_Yeoh_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/52/Michelle_Yeoh_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/61/Michelle_Yeoh_Cannes_2017.jpg",
	],
	"Beyoncé Knowles": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Beyonc%C3%A9_Knowles_at_2009_MTV_VMA%27s.jpg/960px-Beyonc%C3%A9_Knowles_at_2009_MTV_VMA%27s.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/52/Beyonc%C3%A9_Knowles_at_2009_MTV_VMA%27s_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Beyonc%C3%A9_Knowles_GMA_Run_the_World.jpg/960px-Beyonc%C3%A9_Knowles_GMA_Run_the_World.jpg",
	],
	"Rihanna Fenty": [
		"https://upload.wikimedia.org/wikipedia/commons/c/c2/Rihanna_Fenty_2018.png",
		"https://upload.wikimedia.org/wikipedia/commons/e/e4/Rihanna_Fenty_2018_2.png",
		"https://upload.wikimedia.org/wikipedia/commons/1/1a/Rihanna_Fenty_2018_2_%28cropped%29.png",
	],
	"Taylor Swift": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Taylor_Swift_at_the_Golden_Globes_2024_%28Enhanced%2C_cropped%29_2.jpg/330px-Taylor_Swift_at_the_Golden_Globes_2024_%28Enhanced%2C_cropped%29_2.jpg",
		"https://fr.web.img3.acsta.net/c_310_420/pictures/19/08/27/09/51/3618586.jpg",
	],
	"Adele Adkins": [
		"https://upload.wikimedia.org/wikipedia/commons/2/28/Adele_adkins_concert1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Adele_Adkins_at_Martyr%27s.jpg/960px-Adele_Adkins_at_Martyr%27s.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/5e/Adele_Adkins_at_Martyr%27s_%28cropped%29.jpg",
	],
	"Ed Sheeran": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Ed_Sheeran_%288507723113%29.jpg/960px-Ed_Sheeran_%288507723113%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ed_Sheeran_%288507717559%29.jpg/960px-Ed_Sheeran_%288507717559%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Ed_Sheeran%2C_Royal_Albert_Hall_%2813401332043%29.jpg/960px-Ed_Sheeran%2C_Royal_Albert_Hall_%2813401332043%29.jpg",
	],
	"Bruno Mars": [
		"https://m.media-amazon.com/images/M/MV5BMjE1NDE3ODA0MV5BMl5BanBnXkFtZTcwODQ5NTgwNQ@@._V1_FMjpg_UX1000_.jpg",
		"https://img.nrj.fr/7QxKuJ_YEU5E8jKLQmJJoPGJ7k0=/http%3A%2F%2Fmedia.nrj.fr%2F1900x1200%2F2017%2F04%2Fbruno-mars_1360607.png",
	],
	"Justin Bieber": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Justin_Bieber_-DSC_0336-10.20.12_%288107429328%29.jpg/960px-Justin_Bieber_-DSC_0336-10.20.12_%288107429328%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Justin_Bieber_-DSC_0350-10.20.12_%288107435143%29.jpg/960px-Justin_Bieber_-DSC_0350-10.20.12_%288107435143%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Justin_Bieber_-DSC_0448-10.20.12_%288107440949%29.jpg/960px-Justin_Bieber_-DSC_0448-10.20.12_%288107440949%29.jpg",
	],
	"Ariana Grande": [
		"https://cdn-elle.ladmedia.fr/var/plain_site/storage/images/personnalites/ariana-grande/103275873-1-fre-FR/Ariana-Grande.jpg",
		"https://media.vogue.fr/photos/65ef3f1fa7560266b8c1aab2/2:3/w_2560%2Cc_limit/GettyImages-2074353032.jpg",
		"https://www.journalduluxe.fr/files/resize/outside/875-875-ariana-grande-nouvelle-ambassadrice-swarovski_8f08bf76ba19330db05bb6da8d2958e8.jpeg",
	],
	"Billie Eilish": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Billie_Eilish_-_Los_Angeles_2017_%2809%29.jpg/960px-Billie_Eilish_-_Los_Angeles_2017_%2809%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Billie_Eilish_Red_Rocks_06.05.19_%2848012828193%29.jpg/960px-Billie_Eilish_Red_Rocks_06.05.19_%2848012828193%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Billie_Eilish_Red_Rocks_06.05.19_%2848012814716%29.jpg/960px-Billie_Eilish_Red_Rocks_06.05.19_%2848012814716%29.jpg",
	],
	"Dua Lipa": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/British_singer_and_songwriter_Dua_Lipa_at_the_SWR3_New_Pop_Festival_2016.jpg/960px-British_singer_and_songwriter_Dua_Lipa_at_the_SWR3_New_Pop_Festival_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Dua_Lipa-0829.jpg/960px-Dua_Lipa-0829.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/28/Dua_Lipa_-_Dua_Lipa_Complete_Edition_cover.jpg",
	],
	"Abel Tesfaye": [
		"https://upload.wikimedia.org/wikipedia/commons/4/46/The_Weeknd_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/FEQ_July_2018_The_Weeknd_%2844108174204%29.jpg/960px-FEQ_July_2018_The_Weeknd_%2844108174204%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/FEQ_July_2018_The_Weeknd_%2844828781741%29.jpg/960px-FEQ_July_2018_The_Weeknd_%2844828781741%29.jpg",
	],
	"Aubrey Graham": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Aubrey_Beardsley_-_Edgar_Poe_2.jpg/960px-Aubrey_Beardsley_-_Edgar_Poe_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Aubrey_R_Watzek_House_2_%28Portland%2C_Oregon%29.jpg/960px-Aubrey_R_Watzek_House_2_%28Portland%2C_Oregon%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/9/96/SENS_FOUNDATION_-_AUBREY_DE_GREY_%286838320854%29.jpg",
	],
	"Kendrick Lamar": [
		"https://upload.wikimedia.org/wikipedia/commons/9/9f/Kendrick_Lamar_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/81/Anna_Kendrick_-_TIFF_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Anna_Kendrick_%2827869457833%29.jpg/960px-Anna_Kendrick_%2827869457833%29.jpg",
	],
	"Marshall Mathers": [
		"https://upload.wikimedia.org/wikipedia/commons/6/67/The_Marshall_Mathers_LP_Snippet_Tape.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/King_David_To_Marshall_Mathers_III_%28Eminem%29_Genealogy.jpg/960px-King_David_To_Marshall_Mathers_III_%28Eminem%29_Genealogy.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Biblical_Abraham_To_Marshall_Mathers_III_%28Eminem%29_Genealogy.jpg/960px-Biblical_Abraham_To_Marshall_Mathers_III_%28Eminem%29_Genealogy.jpg",
	],
	"Shawn Carter": [
		"https://upload.wikimedia.org/wikipedia/commons/2/24/Shawn-Carter_Jay-Z_2006-11-18_Chicago_Photoby_Adam-Bielawski.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/U.S._Army_Staff_Sgt._Shawn_Carter%2C_assigned_to_the_101st_Airborne_Division%27s_parachute_demonstration_team%2C_prepares_to_jump_out_of_a_UH-60_Black_Hawk_helicopter_during_an_air_show_as_part_of_the_Week_of_120811-A-ZZ999-003.jpg/960px-thumbnail.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Shawn_Johnson_Olympics_Vault.jpg/960px-Shawn_Johnson_Olympics_Vault.jpg",
	],
	"Kanye West": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Kanye_West_-_Champions_Cover.jpg/960px-Kanye_West_-_Champions_Cover.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Kanye_West%27s_808s_%26_Heartbreak_%40_The_Hollywood_Bowl_-_Night_1_%2809-25-15%29_%2821710758656%29.jpg/960px-Kanye_West%27s_808s_%26_Heartbreak_%40_The_Hollywood_Bowl_-_Night_1_%2809-25-15%29_%2821710758656%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Kanye_West%27s_808s_%26_Heartbreak_%40_The_Hollywood_Bowl_-_Night_1_%2809-25-15%29_%2821549065268%29_%28cropped%29.jpg/960px-Kanye_West%27s_808s_%26_Heartbreak_%40_The_Hollywood_Bowl_-_Night_1_%2809-25-15%29_%2821549065268%29_%28cropped%29.jpg",
	],
	"Travis Scott": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Travis_Scott_sagging.jpg/960px-Travis_Scott_sagging.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Travis_Scott_2014_Feb.jpg/960px-Travis_Scott_2014_Feb.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2e/Travis_Scott_2015_2.jpg",
	],
	"Snoop Dogg": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Snoop_Dogg_%2828036133423%29.jpg/960px-Snoop_Dogg_%2828036133423%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Snoop_Dogg_%2828036137833%29.jpg/960px-Snoop_Dogg_%2828036137833%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Snoop_Dogg_2019_by_Glenn_Francis.jpg/960px-Snoop_Dogg_2019_by_Glenn_Francis.jpg",
	],
	"Stefani Germanotta": [
		"https://upload.wikimedia.org/wikipedia/commons/f/f4/Lady_GaGa_cropped.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d5/Lady_Gaga_performing_Poker_Face_on_The_Monster_Ball_Tour%2C_Newcastle%2C_March_2010-2_%28tweak%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Lady_Gaga_-_ArtRave_%28Glasgow%29_02.jpg/960px-Lady_Gaga_-_ArtRave_%28Glasgow%29_02.jpg",
	],
	"Katy Perry": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Katy_Perry_gig_Nottingham_2011_MMB_51.jpg/960px-Katy_Perry_gig_Nottingham_2011_MMB_51.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Katy_Perry_-_Part_Of_Me_Australian_Premiere_-_June_2012_%2812%29.jpg/960px-Katy_Perry_-_Part_Of_Me_Australian_Premiere_-_June_2012_%2812%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Katy_Perry_gig_Nottingham_2011_MMB_20.jpg/960px-Katy_Perry_gig_Nottingham_2011_MMB_20.jpg",
	],
	"Miley Cyrus": [
		"https://upload.wikimedia.org/wikipedia/commons/2/24/YOU%C2%B4RE_GONNA_MAKE_ME_LONESEOME_WHEN_YOU_GO_MILEY_CYRUS.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Miley_Cyrus_and_Liam_Hemsworth_at_the_38th_People%27s_Choice_Award.jpg/960px-Miley_Cyrus_and_Liam_Hemsworth_at_the_38th_People%27s_Choice_Award.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Miley_Cyrus_Primavera19_-228_%2848985546328%29.jpg/960px-Miley_Cyrus_Primavera19_-228_%2848985546328%29.jpg",
	],
	"Selena Gomez": [
		"https://upload.wikimedia.org/wikipedia/commons/5/50/Selena_Gomez_Live_on_Good_Morning_America_01_%28cropped%29_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Greg_Garman_%28Selena_Gomez_%26_The_Scene%29.jpg/960px-Greg_Garman_%28Selena_Gomez_%26_The_Scene%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Selena_Gomez_UNICEF_2012_%28Straighten_Colors_2%29.jpg/960px-Selena_Gomez_UNICEF_2012_%28Straighten_Colors_2%29.jpg",
	],
	"Shakira Mebarak": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Shakira_-_Rock_in_Rio_2008_02.jpg/960px-Shakira_-_Rock_in_Rio_2008_02.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Shakira_Rio_08.jpg/960px-Shakira_Rio_08.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e0/Shakira_NRJ_Music_Awards_2012.jpg",
	],
	"Jennifer Lopez": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Time_100_Jennifer_Lopez_and_Marc_Anthony.jpg/960px-Time_100_Jennifer_Lopez_and_Marc_Anthony.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Kostas_Martakis%2C_Jennifer_Lopez_%26_Marc_Anthony%2C_2008.jpg/960px-Kostas_Martakis%2C_Jennifer_Lopez_%26_Marc_Anthony%2C_2008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/eb/Jennifer_Lopez_2009.jpg",
	],
	"Ricky Martin": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Ricky_Martin_2010.jpg/960px-Ricky_Martin_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2b/Ricky_Martin_7%2C_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Ricky_Martin_Sydney_%288722029963%29.jpg/960px-Ricky_Martin_Sydney_%288722029963%29.jpg",
	],
	"Enrique Iglesias": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Enrique_Iglesias_2007.11.29_3.jpg/960px-Enrique_Iglesias_2007.11.29_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Enrique_Iglesias_2007.11.29_7.jpg/960px-Enrique_Iglesias_2007.11.29_7.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Enrique_Iglesias_%286891748916%29.jpg/960px-Enrique_Iglesias_%286891748916%29.jpg",
	],
	"Benito Ocasio": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e3/Bad_Bunny.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2f/Bad_Bunny_concierto_Ecuador_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6d/Bad_Bunny_concierto_Ecuador.jpg",
	],
	"Carolina Giraldo": [
		"https://upload.wikimedia.org/wikipedia/commons/9/95/Karol_G_2018_2.png",
		"https://upload.wikimedia.org/wikipedia/commons/b/b2/Karol_G_2019.png",
		"https://upload.wikimedia.org/wikipedia/commons/2/21/Karol_G_%26_Anuel_AA_en_El_Salvador_2019_%28cropped%29.jpg",
	],
	"Marc Anthony": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Marc_Anthony.jpg/960px-Marc_Anthony.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Time_100_Jennifer_Lopez_and_Marc_Anthony.jpg/960px-Time_100_Jennifer_Lopez_and_Marc_Anthony.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Jennifer_Lopez_%26_Marc_Anthony_2007.jpg/960px-Jennifer_Lopez_%26_Marc_Anthony_2007.jpg",
	],
	"Sean Paul": [
		"https://upload.wikimedia.org/wikipedia/commons/f/f4/Sean-Paul_2012-06-16_photo-by-Adam-Bielawski.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Sean_Paul_COP21_2015-12-10.jpg/960px-Sean_Paul_COP21_2015-12-10.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/61/2004_NBA_All-Star_Jam_Session_-_Sean_Paul.jpg",
	],
	"Gordon Sumner": [
		"https://upload.wikimedia.org/wikipedia/commons/7/78/Sting_2009_portrait.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/de/Sting_Atlanta_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/40/Sting_in_April_2018.jpg",
	],
	"Paul Hewson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Paul_Simonon_mg_6701b_edit.jpg/960px-Paul_Simonon_mg_6701b_edit.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Peter_%26_Paul_fortress_in_SPB_03.jpg/960px-Peter_%26_Paul_fortress_in_SPB_03.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Paul_Klee_-_Gespenst_eines_Genies_%28Ghost_of_a_Genius%29_-_Google_Art_Project.jpg/960px-Paul_Klee_-_Gespenst_eines_Genies_%28Ghost_of_a_Genius%29_-_Google_Art_Project.jpg",
	],
	"Freddie Mercury": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/960px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/De_zandmannetjes_2_-_Freddie_Langeler.jpg/960px-De_zandmannetjes_2_-_Freddie_Langeler.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Illustratie_van_Freddie_Langeler_17.jpg/960px-Illustratie_van_Freddie_Langeler_17.jpg",
	],
	"Elton John": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Elton_als_Moderator_f%C3%BCr_ZDF_tivi-8367.jpg/960px-Elton_als_Moderator_f%C3%BCr_ZDF_tivi-8367.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Popzanger_Elton_John_in_Nederland_Elton_John_in_Amsterdamse_bos%2C_Bestanddeelnr_924-2763.jpg/960px-Popzanger_Elton_John_in_Nederland_Elton_John_in_Amsterdamse_bos%2C_Bestanddeelnr_924-2763.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Thomas_Barker_%281769-1847%29_-_Mary_Elizabeth_Elton_%281816%E2%80%931840%29%2C_Jane_Octavia_Elton_%281821%E2%80%931896%29%2C_and_Arthur_Hallam_Elton_%281818%E2%80%931883_-_624168_-_National_Trust.jpg/960px-thumbnail.jpg",
	],
	"David Bowie": [
		"https://fr.web.img6.acsta.net/c_310_420/pictures/16/01/11/09/13/467205.jpg",
		"https://anniversaire-celebrite.com/images/celebrites/david-bowie.jpg",
	],
	"Madonna Ciccone": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Clarissa_Vichi_as_Madonna_Ciccone.jpg/960px-Clarissa_Vichi_as_Madonna_Ciccone.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Clarissa_Vichi_as_Madonna_Ciccone_posing_in_Putin%27s_Moscow.jpg/960px-Clarissa_Vichi_as_Madonna_Ciccone_posing_in_Putin%27s_Moscow.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Antonello_da_messina%2C_madonna_salting.jpg/960px-Antonello_da_messina%2C_madonna_salting.jpg",
	],
	"Cherilyn Sarkisian": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5b/Cher_singing.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/52/Singer_Cher_with_Representative_James_Bilbray_and_his_wife_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b3/Cher_at_the_premiere_of_Burlesque.jpg",
	],
	"Whitney Houston": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Whitney_Houston_Welcome_Heroes_8.JPEG/960px-Whitney_Houston_Welcome_Heroes_8.JPEG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Whitney_Houston_Welcome_Heroes_9.JPEG/960px-Whitney_Houston_Welcome_Heroes_9.JPEG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Whitney_Houston_Welcome_Heroes_4.JPEG/960px-Whitney_Houston_Welcome_Heroes_4.JPEG",
	],
	"Mariah Carey": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Mariah_Carey_%40_2010_Academy_Awards.jpg/960px-Mariah_Carey_%40_2010_Academy_Awards.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Mariah_Carey_Live-2.jpg/960px-Mariah_Carey_Live-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/db/Mariah_Carey_At_The_2014_SAG_Awards_%28cropped%29_%28cropped%29.jpg",
	],
	"Celine Dion": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Celine_Dion_Concert_Singing_Taking_Chances_2008.jpg/960px-Celine_Dion_Concert_Singing_Taking_Chances_2008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Celine_Dion_Concert_-_Singing_I%27m_Alive.jpg/960px-Celine_Dion_Concert_-_Singing_I%27m_Alive.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Celine_Dion_both_walk_of_fame_stars.jpg/960px-Celine_Dion_both_walk_of_fame_stars.jpg",
	],
	"Alicia Keys": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Alicia_Keys_live_Walmart_9.jpg/960px-Alicia_Keys_live_Walmart_9.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Alicia_Keys_live_Walmart_6.jpg/960px-Alicia_Keys_live_Walmart_6.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Alicia_Keys_%2811149461995%29.jpg/960px-Alicia_Keys_%2811149461995%29.jpg",
	],
	"John Legend": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/John_Legend_DNC_2008.jpg/960px-John_Legend_DNC_2008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/81/John_Legend_by_Sachyn_Mital.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/John_Legend_%2834998104810%29.jpg/960px-John_Legend_%2834998104810%29.jpg",
	],
	"Stevie Wonder": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Stevie_Wonder_performs.jpg/960px-Stevie_Wonder_performs.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/1e/Stevie_Wonder_CES_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/20111016_Stevie_Wonder_at_the_MLK_Memorial_dedication_concert.jpg/960px-20111016_Stevie_Wonder_at_the_MLK_Memorial_dedication_concert.jpg",
	],
	"Prince Nelson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Prince_Nelson_Enwerem.jpg/960px-Prince_Nelson_Enwerem.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Crown_Prince_Frederick_William_of_Prussia_-_Illustrated_London_News_August_20%2C_1870_-_Crop.PNG/960px-Crown_Prince_Frederick_William_of_Prussia_-_Illustrated_London_News_August_20%2C_1870_-_Crop.PNG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Prince_Cond%C3%A9_1814_Deseine_Chantilly.jpg/960px-Prince_Cond%C3%A9_1814_Deseine_Chantilly.jpg",
	],
	"Michael Jackson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Me_with_Michael_Jackson_%28261530151%29.jpg/960px-Me_with_Michael_Jackson_%28261530151%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Michael_Jackson_-_High_Res_version_%284518179397%29.jpg/960px-Michael_Jackson_-_High_Res_version_%284518179397%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Michael_Jackson_-_High_Res_version_%284518180385%29.jpg/960px-Michael_Jackson_-_High_Res_version_%284518180385%29.jpg",
	],
	"Janet Jackson": [
		"https://upload.wikimedia.org/wikipedia/commons/a/a4/Janet_Jackson_wordmark.png",
		"https://upload.wikimedia.org/wikipedia/commons/5/52/Janet_Jackson_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Janet_Jackson%2C_1998.jpg/960px-Janet_Jackson%2C_1998.jpg",
	],
	"Dolly Parton": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5d/Dolly_Parton_and_Bob_Corker.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c3/Dolly_Parton_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Dolly_Parton_Rose_%28239791751%29.jpg/960px-Dolly_Parton_Rose_%28239791751%29.jpg",
	],
	"Vanessa Paradis": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Vanessa_Paradis_20071103_Chateauroux_2.jpg/960px-Vanessa_Paradis_20071103_Chateauroux_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vanessa_Paradis_20071103_Chateauroux_3.jpg/960px-Vanessa_Paradis_20071103_Chateauroux_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vanessa_Paradis_20071103_Chateauroux_6.jpg/960px-Vanessa_Paradis_20071103_Chateauroux_6.jpg",
	],
	"Isabelle Geffroy": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Isabelle_Faust_B_09-2012.jpg/960px-Isabelle_Faust_B_09-2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Isabelle_August_2016.jpg/960px-Isabelle_August_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Teatro_Olimpico_%28Vicenza%29_-_Ritratto_di_Isabelle_di_Savoia_d%27Este_A81_124%2C5x100.jpg/960px-Teatro_Olimpico_%28Vicenza%29_-_Ritratto_di_Isabelle_di_Savoia_d%27Este_A81_124%2C5x100.jpg",
	],
	"Paul Van Haver": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Paul_Simonon_mg_6701b_edit.jpg/960px-Paul_Simonon_mg_6701b_edit.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Peter_%26_Paul_fortress_in_SPB_03.jpg/960px-Peter_%26_Paul_fortress_in_SPB_03.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Paul_Klee_-_Gespenst_eines_Genies_%28Ghost_of_a_Genius%29_-_Google_Art_Project.jpg/960px-Paul_Klee_-_Gespenst_eines_Genies_%28Ghost_of_a_Genius%29_-_Google_Art_Project.jpg",
	],
	"Angèle Van Laeken": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Hanvec_07-04-2017_Yvonne_Jeanne_Ang%C3%A8le_22.jpg/960px-Hanvec_07-04-2017_Yvonne_Jeanne_Ang%C3%A8le_22.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hanvec_-_Cloche_Yvonne-Jeanne-Ang%C3%A8le.jpg/960px-Hanvec_-_Cloche_Yvonne-Jeanne-Ang%C3%A8le.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Festival_des_Vieilles_Charrues_2018_-_Ang%C3%A8le_-_005.jpg/960px-Festival_des_Vieilles_Charrues_2018_-_Ang%C3%A8le_-_005.jpg",
	],
	"Aya Nakamura": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e6/Aya_Nakamura-23Sept2019.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d3/Aya_Nakamura-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Aya_nakamura_1537552.jpg/960px-Aya_nakamura_1537552.jpg",
	],
	"Julien Mari": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Jul_BD_Angouleme_2013.jpg/960px-Jul_BD_Angouleme_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/08/JUL_-_Julien_Mari_2018.jpg",
	],
	"Élie Yaffa": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Festival_des_Vieilles_Charrues_2019_-_Booba_-_027.jpg/960px-Festival_des_Vieilles_Charrues_2019_-_Booba_-_027.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Festival_des_Vieilles_Charrues_2019_-_Booba_-_031.jpg/960px-Festival_des_Vieilles_Charrues_2019_-_Booba_-_031.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Booba_15%C3%A8me_%C3%A9dition_du_FEMUA_-_03.jpg/960px-Booba_15%C3%A8me_%C3%A9dition_du_FEMUA_-_03.jpg",
	],
	"Aurélien Cotentin": [
		"https://upload.wikimedia.org/wikipedia/commons/a/ac/Orelsan.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Orelsan_Garock_2012.jpg/960px-Orelsan_Garock_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Orelsan_aux_Nuits_Secr%C3%A8tes_2013.jpg/960px-Orelsan_aux_Nuits_Secr%C3%A8tes_2013.jpg",
	],
	"Ken Samaras": [
		"https://upload.wikimedia.org/wikipedia/commons/c/cb/Nekfeu.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/1c/Nekfeu_avp.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Nekfeu_poupet_festival.jpg/960px-Nekfeu_poupet_festival.jpg",
	],
	"Vianney Bureau": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Vianney_Bureau.JPG/960px-Vianney_Bureau.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/c/c4/Eglise_Saint-Vianney_-_1943.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Vianney_-_Pal%C3%A9o_2016.jpg/960px-Vianney_-_Pal%C3%A9o_2016.jpg",
	],
	"Christophe Maé": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1c/Christophe_Ma%C3%A9_NRJ_Music_Awards_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c3/Christophe_Ma%C3%A9_NRJ_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c2/Rencontre_avec_la_star_fran%C3%A7aise_CHRISTOPHE_MA%C3%89.jpg",
	],
	"Patrick Bruel": [
		"https://upload.wikimedia.org/wikipedia/commons/2/29/Patrick_Bruel_Cabourg_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Patrick_Bruel_au_t%C3%A9l%C3%A9vie_2013.jpg/960px-Patrick_Bruel_au_t%C3%A9l%C3%A9vie_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Patrick_Bruel_%C3%A0_Forest_National_-_14_mai_2019_-_03.jpg/960px-Patrick_Bruel_%C3%A0_Forest_National_-_14_mai_2019_-_03.jpg",
	],
	"Mylène Farmer": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b1/Myl%C3%A8ne_Farmer.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Myl%C3%A8ne_Farmer_-_Timeless_2013_-_17.09.2013_-_05.jpg/960px-Myl%C3%A8ne_Farmer_-_Timeless_2013_-_17.09.2013_-_05.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Myl%C3%A8ne_Farmer_-_Timeless_2013_-_17.09.2013_-_07.jpg/960px-Myl%C3%A8ne_Farmer_-_Timeless_2013_-_17.09.2013_-_07.jpg",
	],
	"Nicola Sirkis": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nicola_sirkis.JPG/960px-Nicola_sirkis.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Nicola_Sirkis_2010.JPG/960px-Nicola_Sirkis_2010.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Nicola_Sirkis_-_Meteor_Tour.jpg/960px-Nicola_Sirkis_-_Meteor_Tour.jpg",
	],
	"Jean-Jacques Goldman": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Jean-Jacques_Goldman_-_may_2002.jpg/960px-Jean-Jacques_Goldman_-_may_2002.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Jean_Jacques_Liabeuf_IJ.jpg/960px-Jean_Jacques_Liabeuf_IJ.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/%28Gaillac%29_Portrait_de_Jean-Jacques_Rigal_-_Mus%C3%A9e_des_Beaux-Arts_de_Gaillac.jpg/960px-%28Gaillac%29_Portrait_de_Jean-Jacques_Rigal_-_Mus%C3%A9e_des_Beaux-Arts_de_Gaillac.jpg",
	],
	"Renaud Séchan": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/L%27%C3%A9cole_Renaud_S%C3%A9chan_%28Mirabel_aux_Baronnies%29.jpg/960px-L%27%C3%A9cole_Renaud_S%C3%A9chan_%28Mirabel_aux_Baronnies%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/78/Antoine_de_Favray_-_Charles_Renaud_de_Lastic.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Bouvines.-_Vitrail_19_Le_roi_Philippe_Auguste_lib%C3%A8re_ses_prisonniers_sauf_Ferrand_et_Renaud.jpg/960px-Bouvines.-_Vitrail_19_Le_roi_Philippe_Auguste_lib%C3%A8re_ses_prisonniers_sauf_Ferrand_et_Renaud.jpg",
	],
	"Francis Cabrel": [
		"https://upload.wikimedia.org/wikipedia/commons/9/9a/Francis_Cabrel.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Francis_Cabrel_Brussels.jpg/960px-Francis_Cabrel_Brussels.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Francis_Cabrel%2C_2009.jpg/960px-Francis_Cabrel%2C_2009.jpg",
	],
	"Matt Pokora": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Matt_Pokora_soutient_le_RC_Strasbourg.jpg/960px-Matt_Pokora_soutient_le_RC_Strasbourg.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Matt_Reis.jpg/960px-Matt_Reis.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Fuchsia_%27Sir_Matt_Busby%27.JPG/960px-Fuchsia_%27Sir_Matt_Busby%27.JPG",
	],
	"Kendji Girac": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e2/Kendji_Girac_Belval_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Kendji-Girac.jpg/960px-Kendji-Girac.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Kendji_Girac.jpg/960px-Kendji_Girac.jpg",
	],
	"Louane Emera": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b1/Louane_Emera_Eric_Lartigau_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/56/Louane_Emera_Eric_Lartigau_2014_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/69/Louane_Emera_2014.jpg",
	],
	"Slimane Nebchi": [
		"https://upload.wikimedia.org/wikipedia/commons/2/22/Arabs_Oulad_Slimane.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Mezquita_Slimane_Hamza%2C_Mahdia%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_01.jpg/960px-Mezquita_Slimane_Hamza%2C_Mahdia%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mezquita_Slimane_Hamza%2C_Mahdia%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_02.jpg/960px-Mezquita_Slimane_Hamza%2C_Mahdia%2C_T%C3%BAnez%2C_2016-09-04%2C_DD_02.jpg",
	],
	"Héloïse Letissier": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Festival_des_Vieilles_Charrues_2014_-_Christine_and_the_Queens_-_028.jpg/960px-Festival_des_Vieilles_Charrues_2014_-_Christine_and_the_Queens_-_028.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Festival_des_Vieilles_Charrues_2014_-_Christine_and_the_Queens_-_034.jpg/960px-Festival_des_Vieilles_Charrues_2014_-_Christine_and_the_Queens_-_034.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Festival_des_Vieilles_Charrues_2014_-_Christine_and_the_Queens_-_039.jpg/960px-Festival_des_Vieilles_Charrues_2014_-_Christine_and_the_Queens_-_039.jpg",
	],
	"Sam Smith": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Sam_Smith_Lollapalooza_2015-7.jpg/960px-Sam_Smith_Lollapalooza_2015-7.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tachycineta_bicolor_Sam_Smith_Park_Toronto_house.jpg/960px-Tachycineta_bicolor_Sam_Smith_Park_Toronto_house.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Sam_Smith_Xcel_Energy_Center_8-24-2018_-_0001_09.jpg/960px-Sam_Smith_Xcel_Energy_Center_8-24-2018_-_0001_09.jpg",
	],
	"Janelle Monáe": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Janelle_Mon%C3%A1e_05.jpg/960px-Janelle_Mon%C3%A1e_05.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Janelle_Mon%C3%A1e_04.jpg/960px-Janelle_Mon%C3%A1e_04.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Janelle_Mon%C3%A1e_19.jpg/960px-Janelle_Mon%C3%A1e_19.jpg",
	],
	"Harry Styles": [
		"https://upload.wikimedia.org/wikipedia/commons/3/3a/Harry_Styles.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Harry_Styles_%2814295870121%29.jpg/960px-Harry_Styles_%2814295870121%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/cd/Harry_Styles_Denver_HsLot_2.jpg",
	],
	"Niall Horan": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e5/Niall_Horan_Flicker_World_Tour_Norway_2018.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Niall_Horan_1_%2827137634098%29.jpg/960px-Niall_Horan_1_%2827137634098%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Niall_Horan_%2814274291981%29.jpg/960px-Niall_Horan_%2814274291981%29.jpg",
	],
	"Zayn Malik": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Zayn_Malik%2C_2012.jpg/960px-Zayn_Malik%2C_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/ff/Zayn_Malik_Sydney_4.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Zayn_Malik_Toronto.jpg/960px-Zayn_Malik_Toronto.jpg",
	],
	"Solána Rowe": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ab-Soul_and_SZA_-_AfroPunk_Festival_2015.jpg/960px-Ab-Soul_and_SZA_-_AfroPunk_Festival_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/SZA_CTRL_Tour_Toronto_2017_11.jpg/960px-SZA_CTRL_Tour_Toronto_2017_11.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/SZA_CTRL_Tour_%2836642225441%29.jpg/960px-SZA_CTRL_Tour_%2836642225441%29.jpg",
	],
	"Amala Dlamini": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Doja_Cat_Hot_Pink_Party2.png/960px-Doja_Cat_Hot_Pink_Party2.png",
		"https://upload.wikimedia.org/wikipedia/commons/5/5d/Doja_Cat_Hot_Pink_Party3_%28cropped%29.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Doja_Cat_2019_BET_Awards1.png/960px-Doja_Cat_2019_BET_Awards1.png",
	],
	"Belcalis Almánzar": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Cardi_B_December_2018.jpg/960px-Cardi_B_December_2018.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Cardi_B_-_WEHO_2022_%2852127687059%29.jpg/960px-Cardi_B_-_WEHO_2022_%2852127687059%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Cardi_B_-_WEHO_2022_%2852127471903%29.jpg/960px-Cardi_B_-_WEHO_2022_%2852127471903%29.jpg",
	],
	"Onika Maraj": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nicki_Minaj_Hammersmith_Apollo_2012_Nicki_Minaj_Hammersmith_Apollo_2012_IMG_4468_%287448980164%29.jpg/960px-Nicki_Minaj_Hammersmith_Apollo_2012_Nicki_Minaj_Hammersmith_Apollo_2012_IMG_4468_%287448980164%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Nicki_Minaj_Hammersmith_Apollo_2012_Nicki_Minaj_Hammersmith_Apollo_2012_IMG_4387_%287449011134%29.jpg/960px-Nicki_Minaj_Hammersmith_Apollo_2012_Nicki_Minaj_Hammersmith_Apollo_2012_IMG_4387_%287449011134%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Nicki_Minaj_Hammersmith_Apollo_2012_Nicki_Minaj_Hammersmith_Apollo_2012_IMG_4681_%287537372952%29.jpg/960px-Nicki_Minaj_Hammersmith_Apollo_2012_Nicki_Minaj_Hammersmith_Apollo_2012_IMG_4681_%287537372952%29.jpg",
	],
	"Megan Pete": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Zebra_Swallowtail_laying_an_egg%2C_Megan_McCarty104.jpg/960px-Zebra_Swallowtail_laying_an_egg%2C_Megan_McCarty104.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Banded_Hairstreak%2C_Megan_McCarty120.jpg/960px-Banded_Hairstreak%2C_Megan_McCarty120.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Male_Checkered_White%2C_Megan_McCarty125.jpg/960px-Male_Checkered_White%2C_Megan_McCarty125.jpg",
	],
	"Austin Post": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Post_Malone_%2828150750483%29.jpg/960px-Post_Malone_%2828150750483%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Post_Malone_%2828734295876%29.jpg/960px-Post_Malone_%2828734295876%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8c/Post_Malone_Stavernfestivalen_2018_%28202234%29.jpg",
	],
	"Norah Jones": [
		"https://upload.wikimedia.org/wikipedia/commons/6/66/Norah_Jones_in_April_2003_bijgesneden.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0d/Norah_Jones_Berkeley.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/7b/Norah_Jones_Cannes.jpg",
	],
	"Diana Krall": [
		"https://upload.wikimedia.org/wikipedia/commons/7/7d/Diana_krall.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Elvis_Costello_and_Diana_Krall.jpg/960px-Elvis_Costello_and_Diana_Krall.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/145_Diana_Krall.jpg/960px-145_Diana_Krall.jpg",
	],
	"Andrea Bocelli": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Concierto_Andrea_Bocelli_%2848721053312%29.jpg/960px-Concierto_Andrea_Bocelli_%2848721053312%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Andrea_Bocelli_%22Cinema_World_Tour%22_2017_%40Cluj-Napoca_-_35196375670.jpg/960px-Andrea_Bocelli_%22Cinema_World_Tour%22_2017_%40Cluj-Napoca_-_35196375670.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Andrea_Bocelli_%22Cinema_World_Tour%22_2017_%40Cluj-Napoca_-_35453065531.jpg/960px-Andrea_Bocelli_%22Cinema_World_Tour%22_2017_%40Cluj-Napoca_-_35453065531.jpg",
	],
	"Lang Lang": [
		"https://upload.wikimedia.org/wikipedia/commons/f/fc/Lang_Lang.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Nobel_Peace_Price_Concert_2009_Wyclef_Jean_%26_Lang_Lang.jpg/960px-Nobel_Peace_Price_Concert_2009_Wyclef_Jean_%26_Lang_Lang.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Lang_Lang_VIC_3984%2C_Australia_-_panoramio.jpg/960px-Lang_Lang_VIC_3984%2C_Australia_-_panoramio.jpg",
	],
	"Hans Zimmer": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Hans_Zimmer_%E2%80%93_Z%C3%A9nith_Nantes_%E2%80%93_2016-06-02_%282%29.jpg/960px-Hans_Zimmer_%E2%80%93_Z%C3%A9nith_Nantes_%E2%80%93_2016-06-02_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Hans_Zimmer_%E2%80%93_Z%C3%A9nith_Nantes_%E2%80%93_2016-06-02_%284%29.jpg/960px-Hans_Zimmer_%E2%80%93_Z%C3%A9nith_Nantes_%E2%80%93_2016-06-02_%284%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Hans_Zimmer_live_-_Hans_Zimmer_live_-_Rusanda_Panfili%2C_Mariko_Muranaka_and_Molly_Rogers.jpg/960px-Hans_Zimmer_live_-_Hans_Zimmer_live_-_Rusanda_Panfili%2C_Mariko_Muranaka_and_Molly_Rogers.jpg",
	],
	"Thomas Bangalter": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Thomas_Bangalter_at_82nd_Venice_International_Film_Festival-2.jpg/960px-Thomas_Bangalter_at_82nd_Venice_International_Film_Festival-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Thomas_Bangalter_at_82nd_Venice_International_Film_Festival-4.jpg/960px-Thomas_Bangalter_at_82nd_Venice_International_Film_Festival-4.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Thomas_Bangalter_at_82nd_Venice_International_Film_Festival-3.jpg/960px-Thomas_Bangalter_at_82nd_Venice_International_Film_Festival-3.jpg",
	],
	"David Guetta": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/David_Guetta%2C_2012.jpg/960px-David_Guetta%2C_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/David_Guetta_2%2C_2012.jpg/960px-David_Guetta_2%2C_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/David_Guetta_en_Utop%C3%ADa_Festival_2016_6.jpg/960px-David_Guetta_en_Utop%C3%ADa_Festival_2016_6.jpg",
	],
	"Martin Garrix": [
		"https://upload.wikimedia.org/wikipedia/commons/f/f3/Dee_Push_%26_Martin_Garrix.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/61/Martin_Garrix_IOMTV_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Carl_Cox%2C_Martin_Garrix%2C_Chip_E._B%26W.jpg/960px-Carl_Cox%2C_Martin_Garrix%2C_Chip_E._B%26W.jpg",
	],
	"Calvin Harris": [
		"https://upload.wikimedia.org/wikipedia/commons/4/45/Calvin_Harris_001.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Calvin_Harris_-_Rock_in_Rio_Madrid_2012_-_12.jpg/960px-Calvin_Harris_-_Rock_in_Rio_Madrid_2012_-_12.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/49/Calvin_Harris_-_Rock_in_Rio_Madrid_2012_-_03_-_cropped.jpg",
	],
	"Dorian Lauduique": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Dorian_2019-08-29_1734Z.png/960px-Dorian_2019-08-29_1734Z.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Dorian_2019-08-31_1146Z.jpg/960px-Dorian_2019-08-31_1146Z.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Dorian_2019-09-01_1002Z.jpg/960px-Dorian_2019-09-01_1002Z.jpg",
	],
	"Camila Cabello": [
		"https://upload.wikimedia.org/wikipedia/commons/0/06/Havana_-_Camila_Cabello.png",
		"https://upload.wikimedia.org/wikipedia/commons/6/64/Camila_Cabello_Interview_2018.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/de/Camila_Cabello_VMA_2018.jpg",
	],
	"Shawn Mendes": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Shawn_Mendes_live_in_concert.jpg/960px-Shawn_Mendes_live_in_concert.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Shawn_Mendes_at_The_Queen%27s_Birthday_Party_%28cropped%29.jpg/960px-Shawn_Mendes_at_The_Queen%27s_Birthday_Party_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b4/Shawn_Mendes_at_The_Queen%27s_Birthday_Party_%28cropped_2%29.jpg",
	],
	"Olivia Rodrigo": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Olivia_Rodrigo_with_Dr_Fauci_3.png/960px-Olivia_Rodrigo_with_Dr_Fauci_3.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kamala_Harris_and_Olivia_Rodrigo_at_the_White_House_%284%29.jpg/960px-Kamala_Harris_and_Olivia_Rodrigo_at_the_White_House_%284%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kamala_Harris_and_Olivia_Rodrigo_at_the_White_House_%281%29.jpg/960px-Kamala_Harris_and_Olivia_Rodrigo_at_the_White_House_%281%29.jpg",
	],
	"Ella Yelich-O'Connor": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Quinta_do_Lorde.JPG/960px-Quinta_do_Lorde.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Stolperstein_Audre-Lorde-Str_8_%28Kreuz%29_Ferdinand_Falkenburg.jpg/960px-Stolperstein_Audre-Lorde-Str_8_%28Kreuz%29_Ferdinand_Falkenburg.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Lorde_Constanza_6.jpg/960px-Lorde_Constanza_6.jpg",
	],
	"Melissa Jefferson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/2018_Lizzo_%2843898202094%29.jpg/960px-2018_Lizzo_%2843898202094%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Lizzo_-_Palace_Theatre_-_St._Paul_%2842090455972%29.jpg/960px-Lizzo_-_Palace_Theatre_-_St._Paul_%2842090455972%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Lizzo_%2833582154955%29.jpg/960px-Lizzo_%2833582154955%29.jpg",
	],
	"Rosalía Vila": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Rosal%C3%ADa_de_Castro_-_O_Carril_-_Vilagarc%C3%ADa_de_Arousa_-_Galicia_-2.jpg/960px-Rosal%C3%ADa_de_Castro_-_O_Carril_-_Vilagarc%C3%ADa_de_Arousa_-_Galicia_-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Escultura_dedicada_a_Rosal%C3%ADa._A_Ferradura._Santiago_de_Compostela._Galiza_2013.jpg/960px-Escultura_dedicada_a_Rosal%C3%ADa._A_Ferradura._Santiago_de_Compostela._Galiza_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Rosal%C3%ADa_de_Castro._Rianxo._Galiza-Lmbuga-2013.jpg/960px-Rosal%C3%ADa_de_Castro._Rianxo._Galiza-Lmbuga-2013.jpg",
	],
	"Damini Ogulu": [
		"https://upload.wikimedia.org/wikipedia/commons/4/4a/Untold_2024_-Burna_Boy_%2853927188503%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e2/Untold_2024_-Burna_Boy_%2853927293424%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/83/Untold_2024_-Burna_Boy_%2853927392845%29.jpg",
	],
	"Ayodeji Balogun": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/AFEX_CEO_-_Ayodeji_Balogun_2.jpg/960px-AFEX_CEO_-_Ayodeji_Balogun_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/AFEX_CEO_-_Ayodeji_Balogun.jpg/960px-AFEX_CEO_-_Ayodeji_Balogun.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/AFEX_CEO_-_Ayodeji_Balogun_1.jpg/960px-AFEX_CEO_-_Ayodeji_Balogun_1.jpg",
	],
	"Youssou N'Dour": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Photo_-_Festival_de_Cornouaille_2010_-_Youssou_N%27Dour_en_concert_le_25_juillet_-_001.JPG/960px-Photo_-_Festival_de_Cornouaille_2010_-_Youssou_N%27Dour_en_concert_le_25_juillet_-_001.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Photo_-_Festival_de_Cornouaille_2010_-_Youssou_N%27Dour_en_concert_le_25_juillet_-_010.JPG/960px-Photo_-_Festival_de_Cornouaille_2010_-_Youssou_N%27Dour_en_concert_le_25_juillet_-_010.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Photo_-_Festival_de_Cornouaille_2010_-_Youssou_N%27Dour_en_concert_le_25_juillet_-_016.JPG/960px-Photo_-_Festival_de_Cornouaille_2010_-_Youssou_N%27Dour_en_concert_le_25_juillet_-_016.JPG",
	],
	"Manu Chao": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Anhima_cornuta_-near_Manu_Wildlife_Center%2C_Manu_National_Park%2C_Peru_-three-8.jpg/960px-Anhima_cornuta_-near_Manu_Wildlife_Center%2C_Manu_National_Park%2C_Peru_-three-8.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Manu_Sareen_at_G%C3%B6teborg_Book_Fair_2012_%28crop%29.jpg/960px-Manu_Sareen_at_G%C3%B6teborg_Book_Fair_2012_%28crop%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Manu_Bennett_2_Phoenix_2014.jpg/960px-Manu_Bennett_2_Phoenix_2014.jpg",
	],
	"Barack Obama": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Official_portrait_of_Barack_Obama.jpg/960px-Official_portrait_of_Barack_Obama.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/President_Barack_Obama_with_full_cabinet_09-10-09.jpg/960px-President_Barack_Obama_with_full_cabinet_09-10-09.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Barack_Obama_family_portrait_2011.jpg/960px-Barack_Obama_family_portrait_2011.jpg",
	],
	"Michelle Obama": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Michelle_Obama_official_portrait_crop.jpg/960px-Michelle_Obama_official_portrait_crop.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Michelle_Obama_2013_official_portrait.jpg/960px-Michelle_Obama_2013_official_portrait.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Gursharan_Kaur%2C_Michelle_Obama%2C_Manmohan_Singh_and_Barack_Obama%2C_2009.jpg/960px-Gursharan_Kaur%2C_Michelle_Obama%2C_Manmohan_Singh_and_Barack_Obama%2C_2009.jpg",
	],
	"Emmanuel Macron": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Emmanuel_Macron_par_Claude_Truong-Ngoc_avril_2015.jpg/960px-Emmanuel_Macron_par_Claude_Truong-Ngoc_avril_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8a/Emmanuel_Macron_during_his_meeting_with_Vladimir_Putin%2C_June_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/5c/Vladimir_Putin_and_Emmanuel_Macron_%282018-05-24%29_09.jpg",
	],
	"Brigitte Macron": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Brigitte_Macron_%282017%29.JPG/960px-Brigitte_Macron_%282017%29.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Brigitte_Macron_%28July_2017%29.JPG/960px-Brigitte_Macron_%28July_2017%29.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/22.06.2023_-_Jantar_oferecido_pelo_Presidente_da_Rep%C3%BAblica_Francesa%2C_Emmanuel_Macron%2C_e_pela_Senhora_Brigitte_Macron_%2852994736633%29.jpg/960px-22.06.2023_-_Jantar_oferecido_pelo_Presidente_da_Rep%C3%BAblica_Francesa%2C_Emmanuel_Macron%2C_e_pela_Senhora_Brigitte_Macron_%2852994736633%29.jpg",
	],
	"Angela Merkel": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/B_Angela_Merkel_signing_autographs_1.jpg/960px-B_Angela_Merkel_signing_autographs_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/B_Angela_Merkel_1.jpg/960px-B_Angela_Merkel_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Angela_Merkel_%282008%29.jpg/960px-Angela_Merkel_%282008%29.jpg",
	],
	"Justin Trudeau": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Nate_Leipciger_with_Justin_Trudeau_-_2018.jpg/960px-Nate_Leipciger_with_Justin_Trudeau_-_2018.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/The_Prime_Minister%2C_Shri_Narendra_Modi_with_the_Prime_Minister_of_Canada%2C_Mr._Justin_Trudeau%2C_at_Hyderabad_House%2C_in_New_Delhi_on_February_23%2C_2018_%285%29.jpg/960px-The_Prime_Minister%2C_Shri_Narendra_Modi_with_the_Prime_Minister_of_Canada%2C_Mr._Justin_Trudeau%2C_at_Hyderabad_House%2C_in_New_Delhi_on_February_23%2C_2018_%285%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Gabriela_Michetti_and_Justin_Trudeau.jpg/960px-Gabriela_Michetti_and_Justin_Trudeau.jpg",
	],
	"Volodymyr Zelensky": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Volodymyr_Zelensky_2019_presidential_inauguration_15.jpg/960px-Volodymyr_Zelensky_2019_presidential_inauguration_15.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Volodymyr_Zelensky_2019_presidential_inauguration_23.jpg/960px-Volodymyr_Zelensky_2019_presidential_inauguration_23.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Volodymyr_Zelensky_Official_portrait.jpg/960px-Volodymyr_Zelensky_Official_portrait.jpg",
	],
	"Kamala Harris": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Kamala_Harris_at_July%2C_3_2017_healthcare_rally_3.jpg/960px-Kamala_Harris_at_July%2C_3_2017_healthcare_rally_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Kamala_Harris_-_Feb_2020.jpg/960px-Kamala_Harris_-_Feb_2020.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kamala_Harris_in_Selma_-_2018.jpg/960px-Kamala_Harris_in_Selma_-_2018.jpg",
	],
	"Donald Trump": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Donald_Trump_Cabinet_meeting_2017-03-13_03.jpg/960px-Donald_Trump_Cabinet_meeting_2017-03-13_03.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/960px-Donald_Trump_official_portrait.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Donald_Trump_official_portrait_%28cropped%29.jpg/960px-Donald_Trump_official_portrait_%28cropped%29.jpg",
	],
	"Hillary Clinton": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Sen._Hillary_Clinton_2007_denoise.jpg/960px-Sen._Hillary_Clinton_2007_denoise.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Hillary_Clinton-_Solutions_for_America_Event_%282390159217%29.jpg/960px-Hillary_Clinton-_Solutions_for_America_Event_%282390159217%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Hillary_Clinton_Raleigh_%2829892052143%29.jpg/960px-Hillary_Clinton_Raleigh_%2829892052143%29.jpg",
	],
	"Jacinda Ardern": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Jacinda_Ardern_and_Patsy_Reddy_on_Waitangi_Day_%28crop%29.jpg/960px-Jacinda_Ardern_and_Patsy_Reddy_on_Waitangi_Day_%28crop%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/NZ_PM_Jacinda_Ardern_-_Kirk_HargreavesCCC.jpg/960px-NZ_PM_Jacinda_Ardern_-_Kirk_HargreavesCCC.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/f8/Jacinda_Ardern_%28cropped%29.jpg",
	],
	"Boris Johnson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Rt_Hon_Boris_Johnson_MP%2C_Secretary_of_State_for_Foreign_and_Commonwealth_Affairs%2C_UK.jpg/960px-Rt_Hon_Boris_Johnson_MP%2C_Secretary_of_State_for_Foreign_and_Commonwealth_Affairs%2C_UK.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Boris_Johnson_official_portrait_%28cropped%29.jpg/960px-Boris_Johnson_official_portrait_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Boris_Johnson_hosts_virtual_G7_meeting_%283%29.jpg/960px-Boris_Johnson_hosts_virtual_G7_meeting_%283%29.jpg",
	],
	"Rishi Sunak": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Chancellor_Rishi_Sunak_%28wider_crop%29.jpg/960px-Chancellor_Rishi_Sunak_%28wider_crop%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Prime_Minister_Rishi_Sunak_meets_Japan%27s_Prime_Minister_Kishida_%2852621139366%29.jpg/960px-Prime_Minister_Rishi_Sunak_meets_Japan%27s_Prime_Minister_Kishida_%2852621139366%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/05.05.2023_-_Encontro_com_o_Primeiro-Ministro_do_Reino_Unido%2C_Rishi_Sunak_%2852872367352%29.jpg/960px-05.05.2023_-_Encontro_com_o_Primeiro-Ministro_do_Reino_Unido%2C_Rishi_Sunak_%2852872367352%29.jpg",
	],
	"Keir Starmer": [
		"https://upload.wikimedia.org/wikipedia/commons/2/28/Prime_Minister_Keir_Starmer.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Prime_Minister_Keir_Starmer_visits_Trydan_Gwyrdd_Wind_Farm_%2853936009380%29.jpg/960px-Prime_Minister_Keir_Starmer_visits_Trydan_Gwyrdd_Wind_Farm_%2853936009380%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Prime_Minister_Keir_Starmer_visits_Trydan_Gwyrdd_Wind_Farm_%2853935892124%29.jpg/960px-Prime_Minister_Keir_Starmer_visits_Trydan_Gwyrdd_Wind_Farm_%2853935892124%29.jpg",
	],
	"Pedro Sánchez": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Pedro_S%C3%A1nchez_P%C3%A9rez-Castej%C3%B3n_%28Oficial%29.jpg/960px-Pedro_S%C3%A1nchez_P%C3%A9rez-Castej%C3%B3n_%28Oficial%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pedro_S%C3%A1nchez_con_Juan_Ignacio_Ceniceros_01.jpg/960px-Pedro_S%C3%A1nchez_con_Juan_Ignacio_Ceniceros_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pedro_S%C3%A1nchez_interviene_ante_el_Pleno_del_Parlamento_Europeo_01.jpg/960px-Pedro_S%C3%A1nchez_interviene_ante_el_Pleno_del_Parlamento_Europeo_01.jpg",
	],
	"Giorgia Meloni": [
		"https://upload.wikimedia.org/wikipedia/commons/2/2d/Giorgia_Meloni_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/3b/Giorgia_Meloni_in_2023_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Fumio_Kishida_Giorgia_Meloni_bilateral_meeting_before_G7_Hiroshima_Summit_%281%29_%28cropped%29.jpg/960px-Fumio_Kishida_Giorgia_Meloni_bilateral_meeting_before_G7_Hiroshima_Summit_%281%29_%28cropped%29.jpg",
	],
	"Ursula von der Leyen": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2017-09-24_Ursula_von_der_Leyen_by_Sandro_Halank.jpg/960px-2017-09-24_Ursula_von_der_Leyen_by_Sandro_Halank.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/57/%28Ursula_von_der_Leyen%29_2019.07.16._Ursula_von_der_Leyen_presents_her_vision_to_MEPs_2_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Official_Portrait_of_Ursula_von_der_Leyen_%28cropped%29_%282%29.jpg/960px-Official_Portrait_of_Ursula_von_der_Leyen_%28cropped%29_%282%29.jpg",
	],
	"Christine Lagarde": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b2/IMF_President_Christine_Lagarde_at_CHINICT_bis.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/88/Christine_Lagarde_MSC_2018_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Christine_Lagarde%2C_2023.jpg/960px-Christine_Lagarde%2C_2023.jpg",
	],
	"Cyril Ramaphosa": [
		"https://upload.wikimedia.org/wikipedia/commons/a/a1/Cyril_Ramaphosa_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Vladimir_Putin_and_Cyril_Ramaphosa%2C_26_july_2018_%287%29.jpg/960px-Vladimir_Putin_and_Cyril_Ramaphosa%2C_26_july_2018_%287%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cyril_Ramaphosa_%2829655478137%29.jpg/960px-Cyril_Ramaphosa_%2829655478137%29.jpg",
	],
	"Narendra Modi": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Prime_Minister_Narendra_Modi_in_Mongolia.png/960px-Prime_Minister_Narendra_Modi_in_Mongolia.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Group_photograph_of_Prime_Minister_Narendra_Modi_with_all_the_attendees_of_the_Combined_Commanders%E2%80%99_Conference_2015.jPG/960px-Group_photograph_of_Prime_Minister_Narendra_Modi_with_all_the_attendees_of_the_Combined_Commanders%E2%80%99_Conference_2015.jPG",
		"https://upload.wikimedia.org/wikipedia/commons/3/39/Informal_meeting_between_Vladimir_Putin_and_Narendra_Modi_at_the_Kremlin_in_2015_%2801%29.jpg",
	],
	"Xi Jinping": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/President_Rodrigo_Roa_Duterte_at_the_Bilateral_Meeting_with_Chinese_Government_Officials%2C_Signing_of_Business_LOIs_and_Dinner_Hosted_by_President_Xi_Jinping_01.jpg/960px-thumbnail.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ali_Khamenei_met_with_Xi_Jinping_in_Tehran_2016_%2815%29.jpg/960px-Ali_Khamenei_met_with_Xi_Jinping_in_Tehran_2016_%2815%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Visit_of_Xi_Jinping_to_France_-_2024_%28P063803-92196%29.jpg/960px-Visit_of_Xi_Jinping_to_France_-_2024_%28P063803-92196%29.jpg",
	],
	"Vladimir Putin": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Vladimir_Putin_taking_the_Presidential_Oath%2C_7_May_2000.jpg/960px-Vladimir_Putin_taking_the_Presidential_Oath%2C_7_May_2000.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/60/Vladimir_Putin_25_February_2000-1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e8/Inauguration_of_Vladimir_Putin_7_May_2000-6.jpg",
	],
	"Fumio Kishida": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Fumio_Kishida_20211005_%28cropped%29.jpg/960px-Fumio_Kishida_20211005_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Fumio_Kishida_attended_the_March_2022_G7_summit_at_NATO_HQ_%289%29.jpg/960px-Fumio_Kishida_attended_the_March_2022_G7_summit_at_NATO_HQ_%289%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2e/Fumio_Kishida_and_Olaf_Scholz_at_the_Prime_Minister%27s_Office_2022_%282%29.jpg",
	],
	"Javier Milei": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Javier_Milei_y_Alberto_Fern%C3%A1ndez1.jpg/960px-Javier_Milei_y_Alberto_Fern%C3%A1ndez1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Inauguration_of_Javier_Milei_59427.jpg/960px-Inauguration_of_Javier_Milei_59427.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Inauguration_of_Javier_Milei_11260.jpg/960px-Inauguration_of_Javier_Milei_11260.jpg",
	],
	"Gabriel Boric": [
		"https://upload.wikimedia.org/wikipedia/commons/8/8d/Gabriel_Boric_Font_%28original_2014_official_portrait%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/87/Gabriel_Boric_asume_como_Presidente_de_Chile.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Gabriel_Boric_signed_a_memorandum_on_gender_equality_in_Ottawa_2022_%283%29.jpg/960px-Gabriel_Boric_signed_a_memorandum_on_gender_equality_in_Ottawa_2022_%283%29.jpg",
	],
	"Alexandria Ocasio-Cortez": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Alexandria_Ocasio-Cortez_Official_Portrait.jpg/960px-Alexandria_Ocasio-Cortez_Official_Portrait.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Alexandria_Ocasio-Cortez_Official_Portrait_%28square%29.jpg/960px-Alexandria_Ocasio-Cortez_Official_Portrait_%28square%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Alexandria_Ocasio-Cortez_%40_SXSW_2019_%2846438132055%29.jpg/960px-Alexandria_Ocasio-Cortez_%40_SXSW_2019_%2846438132055%29.jpg",
	],
	"Marine Le Pen": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Lille_-_Meeting_de_Marine_Le_Pen_pour_l%27%C3%A9lection_pr%C3%A9sidentielle%2C_le_26_mars_2017_%C3%A0_Lille_Grand_Palais_%28140%29.JPG/960px-Lille_-_Meeting_de_Marine_Le_Pen_pour_l%27%C3%A9lection_pr%C3%A9sidentielle%2C_le_26_mars_2017_%C3%A0_Lille_Grand_Palais_%28140%29.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Lille_-_Meeting_de_Marine_Le_Pen_pour_l%27%C3%A9lection_pr%C3%A9sidentielle%2C_le_26_mars_2017_%C3%A0_Lille_Grand_Palais_%28045%29.JPG/960px-Lille_-_Meeting_de_Marine_Le_Pen_pour_l%27%C3%A9lection_pr%C3%A9sidentielle%2C_le_26_mars_2017_%C3%A0_Lille_Grand_Palais_%28045%29.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Lille_-_Meeting_de_Marine_Le_Pen_pour_l%27%C3%A9lection_pr%C3%A9sidentielle%2C_le_26_mars_2017_%C3%A0_Lille_Grand_Palais_%28065%29.JPG/960px-Lille_-_Meeting_de_Marine_Le_Pen_pour_l%27%C3%A9lection_pr%C3%A9sidentielle%2C_le_26_mars_2017_%C3%A0_Lille_Grand_Palais_%28065%29.JPG",
	],
	"Jean-Luc Mélenchon": [
		"https://upload.wikimedia.org/wikipedia/commons/a/ae/Jean-Luc_M%C3%A9lenchon_%28Place_au_Peuple%29_001_%28red%C3%A9coup%C3%A9%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/4a/Jean-Luc_M%C3%A9lenchon_%C3%A0_la_F%C3%AAte_de_l%27Humanti%C3%A9_le_12_septembre_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Meeting_M%C3%A9lenchon_Toulouse_-_2017-04-16_-_Jean-Luc_M%C3%A9lenchon_-_20.jpg/960px-Meeting_M%C3%A9lenchon_Toulouse_-_2017-04-16_-_Jean-Luc_M%C3%A9lenchon_-_20.jpg",
	],
	"Édouard Philippe": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5e/%C3%89douard_philippe_.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/%C3%89douarD_philippe_1006510_falala.jpg/960px-%C3%89douarD_philippe_1006510_falala.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/2021-06-29_12-07-08_-_Fontainebleau_-_%C3%89douard_Philippe_s%C3%A9ance_d%C3%A9dicace.jpg/960px-2021-06-29_12-07-08_-_Fontainebleau_-_%C3%89douard_Philippe_s%C3%A9ance_d%C3%A9dicace.jpg",
	],
	"Gabriel Attal": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Dante_Gabriel_Rossetti_-_Joan_of_Arc_%281882%29.jpg/960px-Dante_Gabriel_Rossetti_-_Joan_of_Arc_%281882%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dante_Gabriel_Rossetti_-_The_Day_Dream_-_Google_Art_Project.jpg/960px-Dante_Gabriel_Rossetti_-_The_Day_Dream_-_Google_Art_Project.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Peter-Gabriel-2011I2.jpg/960px-Peter-Gabriel-2011I2.jpg",
	],
	"Anne Hidalgo": [
		"https://upload.wikimedia.org/wikipedia/commons/3/32/Anne_Hidalgo_en_2016_lors_de_l%27inauguration_du_nouvel_am%C3%A9nagement_des_Halles_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/41/Anne_Hidalgo%2C_Congr%C3%A8s_des_maires_19_novembre_2019.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c3/23.06.2023_-_Encontro_com_a_Prefeita_de_Paris%2C_Anne_Hidalgo_%2852996508290%29.jpg",
	],
	"Rachida Dati": [
		"https://upload.wikimedia.org/wikipedia/commons/f/ff/Rachida_Lamrabet.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Rachida_Dati_dauphine.JPG/960px-Rachida_Dati_dauphine.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rachida_Dati.jpg/960px-Rachida_Dati.jpg",
	],
	"Malala Yousafzai": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Malala_Yousafzai_par_Claude_Truong-Ngoc_novembre_2013.jpg/960px-Malala_Yousafzai_par_Claude_Truong-Ngoc_novembre_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Photo_de_famille_lors_de_la_remise_du_25e_prix_Sakharov_%C3%A0_Malala_Yousafzai_Strasbourg_20_novembre_2013_01.jpg/960px-Photo_de_famille_lors_de_la_remise_du_25e_prix_Sakharov_%C3%A0_Malala_Yousafzai_Strasbourg_20_novembre_2013_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Freida_Pinto_and_Malala_discuss_girls%27_rights.jpg/960px-Freida_Pinto_and_Malala_discuss_girls%27_rights.jpg",
	],
	"Greta Thunberg": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Greta-morgane-glasfl%C3%BCgler.jpg/960px-Greta-morgane-glasfl%C3%BCgler.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Greta_oto_qtl2.jpg/960px-Greta_oto_qtl2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/MJK_08458_Greta_Gerwig_%28Berlinale_2018%29.jpg/960px-MJK_08458_Greta_Gerwig_%28Berlinale_2018%29.jpg",
	],
	"Sanna Marin": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sanna_Marin_M-7403_01.jpg/960px-Sanna_Marin_M-7403_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Sanna_Marin_M-7403_08.jpg/960px-Sanna_Marin_M-7403_08.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Sanna_Marin_M-7403_10.jpg/960px-Sanna_Marin_M-7403_10.jpg",
	],
	"Mette Frederiksen": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/20170616_Folkemodet_Socialdemokratiet_Mette_Frederiksen_50A9673_%2835363866636%29.jpg/960px-20170616_Folkemodet_Socialdemokratiet_Mette_Frederiksen_50A9673_%2835363866636%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Mette_Frederiksen_%2854976089094%29.jpg/960px-Mette_Frederiksen_%2854976089094%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Mette_Frederiksen_%2854976014828%29.jpg/960px-Mette_Frederiksen_%2854976014828%29.jpg",
	],
	"Zuzana Čaputová": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Zuzana_%C4%8Caputov%C3%A1_%2820.6.2019%29_V.jpg/960px-Zuzana_%C4%8Caputov%C3%A1_%2820.6.2019%29_V.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Zuzana_%C4%8Caputov%C3%A1_v_Brn%C4%9B_2020-03-10a2.jpg/960px-Zuzana_%C4%8Caputov%C3%A1_v_Brn%C4%9B_2020-03-10a2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Zuzana_%C4%8Caputov%C3%A1_v_Brn%C4%9B_2020-03-10f5.jpg/960px-Zuzana_%C4%8Caputov%C3%A1_v_Brn%C4%9B_2020-03-10f5.jpg",
	],
	"Nicolas Sarkozy": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Nicolas_Sarkozy_%282008%29.jpg/960px-Nicolas_Sarkozy_%282008%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Nicolas_Sarkozy%2C_2007.jpg/960px-Nicolas_Sarkozy%2C_2007.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Nicolas_Sarkozy_2010_%28cropped%29.jpg/960px-Nicolas_Sarkozy_2010_%28cropped%29.jpg",
	],
	"François Hollande": [
		"https://upload.wikimedia.org/wikipedia/commons/4/45/Fran%C3%A7ois_hollande_2011_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Meeting_Fran%C3%A7ois_Hollande_22_September_2011_N1.jpg/960px-Meeting_Fran%C3%A7ois_Hollande_22_September_2011_N1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a5/Fran%C3%A7ois_Hollande_in_2011.jpg",
	],
	"Ségolène Royal": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/S%C3%A9gol%C3%A8ne_Royal_-_Royal_%26_Zapatero%27s_meeting_in_Toulouse_for_the_2007_French_presidential_election_0276_2007-04-19.jpg/960px-S%C3%A9gol%C3%A8ne_Royal_-_Royal_%26_Zapatero%27s_meeting_in_Toulouse_for_the_2007_French_presidential_election_0276_2007-04-19.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/S%C3%A9gol%C3%A8ne_Royal%2C_Socialist_rally%2C_Z%C3%A9nith%2C_2007_05_29_n13.jpg/960px-S%C3%A9gol%C3%A8ne_Royal%2C_Socialist_rally%2C_Z%C3%A9nith%2C_2007_05_29_n13.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/S%C3%A9gol%C3%A8ne_Royal_-_Cohen%27s_rallye%2C_Toulouse_town_election%2C_2008_-_1407.jpg/960px-S%C3%A9gol%C3%A8ne_Royal_-_Cohen%27s_rallye%2C_Toulouse_town_election%2C_2008_-_1407.jpg",
	],
	"Elon Musk": [
		"https://upload.wikimedia.org/wikipedia/commons/5/5e/Elon_Musk_-_54820081119_%28cropped%29.jpg",
		"https://cdn8.futura-sciences.com/s480/Elon%20Musk1.jpg",
	],
	"Jeff Bezos": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Secretary_of_Defense_Ash_Carter_meets_with_Jeff_Bezos%2C_May_5%2C_2016_%282%29.jpg/960px-Secretary_of_Defense_Ash_Carter_meets_with_Jeff_Bezos%2C_May_5%2C_2016_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Secretary_of_Defense_Ash_Carter_meets_with_Jeff_Bezos%2C_May_5%2C_2016_%2810%29.jpg/960px-Secretary_of_Defense_Ash_Carter_meets_with_Jeff_Bezos%2C_May_5%2C_2016_%2810%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Net_worth_of_Jeff_Bezos_from_1999_to_2018.png/960px-Net_worth_of_Jeff_Bezos_from_1999_to_2018.png",
	],
	"Bill Gates": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Steve_Jobs_and_Bill_Gates_%28522695099%29.jpg/960px-Steve_Jobs_and_Bill_Gates_%28522695099%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bill_Gates%2C_speaking_at_the_UK-hosted_GAVI_immunisation_Alliance_pledging_event.jpg/960px-Bill_Gates%2C_speaking_at_the_UK-hosted_GAVI_immunisation_Alliance_pledging_event.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Bill_Gates_MSC_2017.jpg/960px-Bill_Gates_MSC_2017.jpg",
	],
	"Mark Zuckerberg": [
		"https://upload.wikimedia.org/wikipedia/commons/c/c6/Mark_Zuckerberg_-_Caricature.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mark_Zuckerberg_%287985194652%29.jpg/960px-Mark_Zuckerberg_%287985194652%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Mark_Zuckerberg_%288137944044%29.jpg/960px-Mark_Zuckerberg_%288137944044%29.jpg",
	],
	"Sundar Pichai": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sundar_Pichai%2C_on_stage_at_Google%27s_2014_Google_I-O_Conference_%2815031323426%29.jpg/960px-Sundar_Pichai%2C_on_stage_at_Google%27s_2014_Google_I-O_Conference_%2815031323426%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Meet_Google_CEO_Sundar_Pichai_%40Hanoi%2C_Vietnam_%2823551593399%29.jpg/960px-Meet_Google_CEO_Sundar_Pichai_%40Hanoi%2C_Vietnam_%2823551593399%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vietnamese_IT_community_Meets_Google_CEO_Sundar_Pichai_at_Hanoi97.jpg/960px-Vietnamese_IT_community_Meets_Google_CEO_Sundar_Pichai_at_Hanoi97.jpg",
	],
	"Satya Nadella": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Microsoft_CEO_Satya_Nadella_meets_Prime_Minister_Narendra_Modi.jpg/960px-Microsoft_CEO_Satya_Nadella_meets_Prime_Minister_Narendra_Modi.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Prime_Minister_Narendra_Modi_with_the_Satya_Nadella_of_Microsoft%2C_Sundar_Pichai_of_Google%2C_John_Chambers_of_CISCO%2C_Shantanu_Narayen_of_Adobe_and_Paul_Jacobs_of_Qualcomm.jpg/960px-thumbnail.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/The_Microsoft_CEO%2C_Shri_Satya_Nadella_calling_on_the_Prime_Minister%2C_Shri_Narendra_Modi%2C_in_New_Delhi_on_May_30%2C_2016.jpg/960px-The_Microsoft_CEO%2C_Shri_Satya_Nadella_calling_on_the_Prime_Minister%2C_Shri_Narendra_Modi%2C_in_New_Delhi_on_May_30%2C_2016.jpg",
	],
	"Tim Cook": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Tim_Cook_and_Mike_Bloomberg_at_Global_Business_Forum_Sept_2017.jpg/960px-Tim_Cook_and_Mike_Bloomberg_at_Global_Business_Forum_Sept_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Steven_Mnuchin_and_Tim_Cook_at_Apple_HQ.jpg/960px-Steven_Mnuchin_and_Tim_Cook_at_Apple_HQ.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tim_Cook_%282017%29_%28cropped%29.jpg/960px-Tim_Cook_%282017%29_%28cropped%29.jpg",
	],
	"Steve Jobs": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Steve_Jobs_and_Bill_Gates_%28522695099%29.jpg/960px-Steve_Jobs_and_Bill_Gates_%28522695099%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Steve_Jobs_Headshot_2010-CROP.jpg/960px-Steve_Jobs_Headshot_2010-CROP.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg/960px-Steve_Jobs_Headshot_2010-CROP2.jpg",
	],
	"Sheryl Sandberg": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Sheryl_Sandberg_Moet_Hennessy_Financial_Times_Club_Dinner_2011.jpg/960px-Sheryl_Sandberg_Moet_Hennessy_Financial_Times_Club_Dinner_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sheryl_Sandberg_World_Economic_Forum_2013.jpg/960px-Sheryl_Sandberg_World_Economic_Forum_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Sheryl_Sandberg_2013.jpg/960px-Sheryl_Sandberg_2013.jpg",
	],
	"Susan Wojcicki": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1e/Susan_Wojcicki_at_TechCrunch_Disrupt_SF_2013_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mateusz_Morawiecki_wraz_z_Susan_Wojcicki_prezesem_YouTube_odwiedzili_Centrum_Nauki_Kopernik.jpg/960px-Mateusz_Morawiecki_wraz_z_Susan_Wojcicki_prezesem_YouTube_odwiedzili_Centrum_Nauki_Kopernik.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Susan_Wojcicki_at_TechCrunch_Disrupt_SF_2013_%28cropped_2%29.jpg/960px-Susan_Wojcicki_at_TechCrunch_Disrupt_SF_2013_%28cropped_2%29.jpg",
	],
	"Reed Hastings": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ethel_Reed_%28ca._1895%29_by_Frances_Benjamin_Johnston.jpg/960px-Ethel_Reed_%28ca._1895%29_by_Frances_Benjamin_Johnston.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Priscilla_Horton_%28Mrs._German_Reed%29_as_Ariel.jpg/960px-Priscilla_Horton_%28Mrs._German_Reed%29_as_Ariel.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Madagascar_reed_frog_%28Heterixalus_punctatus%29_Mantadia.jpg/960px-Madagascar_reed_frog_%28Heterixalus_punctatus%29_Mantadia.jpg",
	],
	"Jack Ma": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Jack_plug.png/960px-Jack_plug.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Szczenie_Jack_Russell_Terrier3.jpg/960px-Szczenie_Jack_Russell_Terrier3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mrs_Irene_Bracker_by_Jack_Delano_b_1943.jpg/960px-Mrs_Irene_Bracker_by_Jack_Delano_b_1943.jpg",
	],
	"Larry Page": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Larry_Elmore.jpg/960px-Larry_Elmore.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Larry_the_cat_trying_out_his_harness_for_the_first_time_in_Auderghem%2C_Belgium_%28sideways%29.jpg/960px-Larry_the_cat_trying_out_his_harness_for_the_first_time_in_Auderghem%2C_Belgium_%28sideways%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Larry_the_cat_sitting_besides_a_wooden_lawn_chair_in_Auderghem%2C_Belgium_%28DSCF2368%29.jpg/960px-Larry_the_cat_sitting_besides_a_wooden_lawn_chair_in_Auderghem%2C_Belgium_%28DSCF2368%29.jpg",
	],
	"Sergey Brin": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sergey_Nikolsky_%281997%29.jpg/960px-Sergey_Nikolsky_%281997%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0d/Sergey_Yakovlovich_Elpatyevsky.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sergey_Vaganov.jpg/960px-Sergey_Vaganov.jpg",
	],
	"Jack Dorsey": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Jack_Dorsey_01.jpg/960px-Jack_Dorsey_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Presidente_Pi%C3%B1era_y_Jack_Dorsey.jpg/960px-Presidente_Pi%C3%B1era_y_Jack_Dorsey.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Presidente_Pi%C3%B1era_%26_Jack_Dorsey.jpg/960px-Presidente_Pi%C3%B1era_%26_Jack_Dorsey.jpg",
	],
	"Evan Spiegel": [
		"https://upload.wikimedia.org/wikipedia/commons/c/ce/Evan_Spiegel%2C_founder_of_Snapchat.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Evan_Spiegel_at_TechCrunch.jpg/960px-Evan_Spiegel_at_TechCrunch.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8d/Evan_Spiegel_at_TechCrunch_2.jpg",
	],
	"Brian Chesky": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Secretary_Kerry_Walks_With_Airbnb_CEO_Brian_Chesky_%2829346368490%29.jpg/960px-Secretary_Kerry_Walks_With_Airbnb_CEO_Brian_Chesky_%2829346368490%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Airbnb_Co-founder_and_CEO_Brian_Chesky_Delivers_Remarks_at_the_Airbnb_Luncheon_For_the_U.S._Department_of_State%E2%80%99s_Gilman_Scholarship_Program_%2829555822991%29.jpg/960px-Airbnb_Co-founder_and_CEO_Brian_Chesky_Delivers_Remarks_at_the_Airbnb_Luncheon_For_the_U.S._Department_of_State%E2%80%99s_Gilman_Scholarship_Program_%2829555822991%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/06/Brian_Chesky%2C_2016_%28cropped%29.jpg",
	],
	"Whitney Wolfe Herd": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Pratt_%26_Whitney_J58.jpg/960px-Pratt_%26_Whitney_J58.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Lady_Godiva_by_Anne_Whitney%2C_c._1861-1864%2C_marble_-_Dallas_Museum_of_Art_-_DSC04778.jpg/960px-Lady_Godiva_by_Anne_Whitney%2C_c._1861-1864%2C_marble_-_Dallas_Museum_of_Art_-_DSC04778.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Pratt_%26_Whitney_Canada_PW815_engine%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0411%29.jpg/960px-Pratt_%26_Whitney_Canada_PW815_engine%2C_EBACE_2018%2C_Le_Grand-Saconnex_%28BL7C0411%29.jpg",
	],
	"Sam Altman": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Isaac_Herzog_meeting_with_Sam_Altman%2C_June_2023_%28GPOABG539%29.jpeg/960px-Isaac_Herzog_meeting_with_Sam_Altman%2C_June_2023_%28GPOABG539%29.jpeg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Meeting_with_Masayoshi_Son_and_Sam_Altman_%28February_3%2C_2025%29.jpg/960px-Meeting_with_Masayoshi_Son_and_Sam_Altman_%28February_3%2C_2025%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Prime_Minister_Shigeru_Ishiba_and_Sam_Altman.jpg/960px-Prime_Minister_Shigeru_Ishiba_and_Sam_Altman.jpg",
	],
	"Demis Hassabis": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/PhotonQ-Demis_Hassabis_on_Artificial_Playful_Intelligence_%2815366514658%29_%282%29.jpg/960px-PhotonQ-Demis_Hassabis_on_Artificial_Playful_Intelligence_%2815366514658%29_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d9/PhotonQ-Demis_Hassabis_on_Artificial_Playful_Intelligence_%2815366514658%29_%282%29_%28cropped_to_Demis_Hassabis%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Demis_Hassabis.jpg/960px-Demis_Hassabis.jpg",
	],
	"Neil deGrasse Tyson": [
		"https://upload.wikimedia.org/wikipedia/commons/8/8d/Neil_deGrasse_Tyson.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Bill_Nye%2C_Barack_Obama_and_Neil_deGrasse_Tyson_selfie_2014.jpg/960px-Bill_Nye%2C_Barack_Obama_and_Neil_deGrasse_Tyson_selfie_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2014_Dr._Neil_deGrasse_Tyson_Visits_NASA_Goddard_%2814339308834%29.jpg/960px-2014_Dr._Neil_deGrasse_Tyson_Visits_NASA_Goddard_%2814339308834%29.jpg",
	],
	"Brian Cox": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Professor_Brian_Cox_at_the_Science_Foo_Camp_--_11_August_2008.jpg/960px-Professor_Brian_Cox_at_the_Science_Foo_Camp_--_11_August_2008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Prof_Brian_Cox.jpg/960px-Prof_Brian_Cox.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Brian_Cox%2C_2013.jpg/960px-Brian_Cox%2C_2013.jpg",
	],
	"Cédric Villani": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1e/C%C3%A9dric_Villani.jpeg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2010_Medef_universite_ete_C%C3%A9dric_Villani.jpg/960px-2010_Medef_universite_ete_C%C3%A9dric_Villani.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/C%C3%A9dric_Villani_IHP.jpg/960px-C%C3%A9dric_Villani_IHP.jpg",
	],
	"Thomas Pesquet": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/NEEMO_18_Aki_Hoshide_and_Thomas_Pesquet.jpg/960px-NEEMO_18_Aki_Hoshide_and_Thomas_Pesquet.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Thomas_Pesquet%2C_official_portrait_%282%29.jpg/960px-Thomas_Pesquet%2C_official_portrait_%282%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/ISS-50_Thomas_Pesquet_next_to_the_airlock_inside_the_Kibo_lab.jpg/960px-ISS-50_Thomas_Pesquet_next_to_the_airlock_inside_the_Kibo_lab.jpg",
	],
	"Jensen Huang": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Jensen_Huang_at_Computex_Taipei_20160531c.jpg/960px-Jensen_Huang_at_Computex_Taipei_20160531c.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c4/Jensen_Huang_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Jensen_Huang_20231109.jpg/960px-Jensen_Huang_20231109.jpg",
	],
	"Marissa Mayer": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Marissa_Mayer_at_Google.jpg/960px-Marissa_Mayer_at_Google.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Marissa_Mayer%2C_LeWeb_2008_III.jpg/960px-Marissa_Mayer%2C_LeWeb_2008_III.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Marissa_Mayer_LeWeb_2008_V.jpg/960px-Marissa_Mayer_LeWeb_2008_V.jpg",
	],
	"Anne Wojcicki": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Anne_Wojcicki_at_GES_2016.jpg/960px-Anne_Wojcicki_at_GES_2016.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Anne_Wojcicki_%2836938473750%29.jpg/960px-Anne_Wojcicki_%2836938473750%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Anne_Wojcicki_%2836938473750%29_%28cropped%29.jpg/960px-Anne_Wojcicki_%2836938473750%29_%28cropped%29.jpg",
	],
	"Xavier Niel": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Xavier_Niel.jpg/960px-Xavier_Niel.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Xavier_Niel%2C_FreeIliad.jpg/960px-Xavier_Niel%2C_FreeIliad.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/2011_Salon_des_entrepreneurs_Paris_Xavier_Niel_Illiad-Free.jpg/960px-2011_Salon_des_entrepreneurs_Paris_Xavier_Niel_Illiad-Free.jpg",
	],
	"Bernard Arnault": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bernard_Arnault.jpg/960px-Bernard_Arnault.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/61/Bernard_Arnault_and_Vladimir_Putin.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Bernard_Arnault_%285%29_-_2017.jpg/960px-Bernard_Arnault_%285%29_-_2017.jpg",
	],
	"Marc Simoncini": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Marc_Simoncini.jpg/960px-Marc_Simoncini.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/2011_Salon_des_entrepreneurs_Marc_Simoncini.jpg/960px-2011_Salon_des_entrepreneurs_Marc_Simoncini.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d4/2011_Marc_Simoncini.jpg",
	],
	"J.K. Rowling": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/J._K._Rowling_at_the_White_House_2010-04-05_4.jpg/960px-J._K._Rowling_at_the_White_House_2010-04-05_4.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_house_where_J.K._Rowling_lived-geograph-1954642.jpg/960px-The_house_where_J.K._Rowling_lived-geograph-1954642.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/J._K._Rowling_She_was_severely_depressed._Oprah_Winfrey_enduring_an_often_abusive_childhood_%2824816094638%29.jpg/960px-J._K._Rowling_She_was_severely_depressed._Oprah_Winfrey_enduring_an_often_abusive_childhood_%2824816094638%29.jpg",
	],
	"Stephen King": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King_-_2011_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Stephen_King%2C_1984_%281%29.jpg/960px-Stephen_King%2C_1984_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_photograph_of_Owen_and_Stephen_King_by_James_Leonard%2C_c._1982.jpg/960px-Portrait_photograph_of_Owen_and_Stephen_King_by_James_Leonard%2C_c._1982.jpg",
	],
	"George R.R. Martin": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Ninni_Aalto_and_George_R.R._Martin_Archipelacon.JPG/960px-Ninni_Aalto_and_George_R.R._Martin_Archipelacon.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/George_R._R._Martin_%26_Ed_Bryant_by_Gage_Skidmore.jpg/960px-George_R._R._Martin_%26_Ed_Bryant_by_Gage_Skidmore.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/George_R._R._Martin_%2854743312268%29.jpg/960px-George_R._R._Martin_%2854743312268%29.jpg",
	],
	"Haruki Murakami": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Haruki_Murakami_at_the_Jerusalem_Prize.JPG/960px-Haruki_Murakami_at_the_Jerusalem_Prize.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/6/6c/Photo_signed_by_Haruki_Murakami.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Haruki_Murakami_2018.jpg/960px-Haruki_Murakami_2018.jpg",
	],
	"Paulo Coelho": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Paulo_Coelho_nrkbeta.jpg/960px-Paulo_Coelho_nrkbeta.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Paulo_Coelho_2007-04-07_001.jpg/960px-Paulo_Coelho_2007-04-07_001.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pra%C3%A7a_Paulo_Coelho_%28Porto_Alegre%2C_Brasil%29.JPG/960px-Pra%C3%A7a_Paulo_Coelho_%28Porto_Alegre%2C_Brasil%29.JPG",
	],
	"Dan Brown": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b7/Dan_Brown_-_classroom.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/8b/Dan_Brown_bookjacket_cropped.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Liam_Cromby_and_Dan_Brown.jpg/960px-Liam_Cromby_and_Dan_Brown.jpg",
	],
	"John Green": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/John_Green_%2814544845231%29.jpg/960px-John_Green_%2814544845231%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2d/General_John_Green.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/John_Green_%284792941528%29.jpg/960px-John_Green_%284792941528%29.jpg",
	],
	"Suzanne Collins": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Suzanne_Collins_David_Shankbone_2010.jpg/960px-Suzanne_Collins_David_Shankbone_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Suzanne_Collins_David_Shankbone_2010_%28cropped%29.jpg/960px-Suzanne_Collins_David_Shankbone_2010_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Suzanne_Collins.jpg/960px-Suzanne_Collins.jpg",
	],
	"Colleen Hoover": [
		"https://upload.wikimedia.org/wikipedia/commons/f/fa/Colleen_Hoover_Video_Call.png",
		"https://upload.wikimedia.org/wikipedia/commons/7/77/Colleen_Hoover_2022.png",
		"https://upload.wikimedia.org/wikipedia/commons/c/c5/Colleen_Hoover.jpg",
	],
	"Amélie Nothomb": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1f/Am%C3%A9lie_Nothomb.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Am%C3%A9lie_Nothomb_-_Foire_du_livre_de_Bruxelles_-_2010_-_02.JPG/960px-Am%C3%A9lie_Nothomb_-_Foire_du_livre_de_Bruxelles_-_2010_-_02.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Link_between_Am%C3%A9lie_Nothomb_and_the_House_of_de_Trazegnies_d%27Ittre_%28Marquess%29.png/960px-Link_between_Am%C3%A9lie_Nothomb_and_the_House_of_de_Trazegnies_d%27Ittre_%28Marquess%29.png",
	],
	"Marc Levy": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Marc_levy.jpg/960px-Marc_levy.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Some_works_of_Marc_Levy_in_French.jpg/960px-Some_works_of_Marc_Levy_in_French.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jean-Marc_L%C3%A9vy-Leblond_aux_Utopiales_2013_-_1.jpg/960px-Jean-Marc_L%C3%A9vy-Leblond_aux_Utopiales_2013_-_1.jpg",
	],
	"Guillaume Musso": [
		"https://upload.wikimedia.org/wikipedia/commons/6/63/Guillaume_Musso_-_Bove_Morgan.jpeg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Guillaume_Musso_-_Italy_-_mai_2010.jpg/960px-Guillaume_Musso_-_Italy_-_mai_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0f/Guillaume_Musso_2013.jpg",
	],
	"Michel Houellebecq": [
		"https://upload.wikimedia.org/wikipedia/commons/7/71/2008.06.09._Michel_Houellebecq_Fot_Mariusz_Kubik_02.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/17/2008.06.09._Michel_Houellebecq_Fot_Mariusz_Kubik_17.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/a/a9/2008.06.09._Krystyna_Rodowska_and_Michel_Houellebecq_Fot_Mariusz_Kubik.JPG",
	],
	"Leïla Slimani": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Le%C3%AFla_Slimani_%2821e_Maghreb_des_Livres%2C_Paris%2C_7_et_8_f%C3%A9vrier_2015%29.jpg/960px-Le%C3%AFla_Slimani_%2821e_Maghreb_des_Livres%2C_Paris%2C_7_et_8_f%C3%A9vrier_2015%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Le%C3%AFla_Slimani_no_Fronteiras_do_Pensamento_S%C3%A3o_Paulo_2018_%2828071293767%29.jpg/960px-Le%C3%AFla_Slimani_no_Fronteiras_do_Pensamento_S%C3%A3o_Paulo_2018_%2828071293767%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Le%C3%AFla_Slimani_no_Fronteiras_do_Pensamento_S%C3%A3o_Paulo_2018_%2841129675060%29.jpg/960px-Le%C3%AFla_Slimani_no_Fronteiras_do_Pensamento_S%C3%A3o_Paulo_2018_%2841129675060%29.jpg",
	],
	"Virginie Despentes": [
		"https://upload.wikimedia.org/wikipedia/commons/e/ef/Clara_Ponsot_Virginie_Despentes_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/30/Virginie_Despentes_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Virginie_Despentes_-_Prix_Landerneau_D%C3%A9couvertes_et_Roman_2015_%2816482418486%29.jpg/960px-Virginie_Despentes_-_Prix_Landerneau_D%C3%A9couvertes_et_Roman_2015_%2816482418486%29.jpg",
	],
	"Yuval Noah Harari": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b0/Yuval_Noah_Harari_photo.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/1c/Yuval_Noah_Harari.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e9/Yuval_Noah_Harari%2C_2013_%28cropped%29.jpg",
	],
	"Malcolm Gladwell": [
		"https://upload.wikimedia.org/wikipedia/commons/9/9d/Malcolm_Gladwell_2014_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Malcolm_Gladwell%2C_2008_%28cropped%29.jpg/960px-Malcolm_Gladwell%2C_2008_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pop%21Tech_2008_-_Malcolm_Gladwell.jpg/960px-Pop%21Tech_2008_-_Malcolm_Gladwell.jpg",
	],
	"Neil Gaiman": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Amanda_Palmer_-_Arena_Vienna_2011_a09_Neil_Gaiman.jpg/960px-Amanda_Palmer_-_Arena_Vienna_2011_a09_Neil_Gaiman.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Amanda_Palmer_-_Arena_Vienna_2011_b18_Neil_Gaiman.jpg/960px-Amanda_Palmer_-_Arena_Vienna_2011_b18_Neil_Gaiman.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Kyle-cassidy-neil-gaiman-April-2013.jpg/960px-Kyle-cassidy-neil-gaiman-April-2013.jpg",
	],
	"Khaled Hosseini": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Khaled_Hosseini_%289037473967%29.jpg/960px-Khaled_Hosseini_%289037473967%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Khaled_Hosseini_%289039696558%29.jpg/960px-Khaled_Hosseini_%289039696558%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Khaled_Hosseini_%289037470275%29.jpg/960px-Khaled_Hosseini_%289037470275%29.jpg",
	],
	"Chimamanda Ngozi Adichie": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Chimamanda_Ngozi_Adichie_3.jpg/960px-Chimamanda_Ngozi_Adichie_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Chimamanda_Ngozi_Adichie_at_a_signing_in_Berlin%2C_Germany_on_16_May_2014_%28cropped%29.jpg/960px-Chimamanda_Ngozi_Adichie_at_a_signing_in_Berlin%2C_Germany_on_16_May_2014_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/de/Chimamanda_Ngozi_Adichie_2014_%28cropped%29.jpg",
	],
	"Virgil Abloh": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Virgil_Abloh_at_Columbia_GSAPP.jpg/960px-Virgil_Abloh_at_Columbia_GSAPP.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/c2/Virgil_Abloh_at_Columbia_GSAPP_%28cropped%29.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Virgil_Abloh_Paris_Fashion_Week_Autumn_Winter_2019.jpg/960px-Virgil_Abloh_Paris_Fashion_Week_Autumn_Winter_2019.jpg",
	],
	"Anna Wintour": [
		"https://upload.wikimedia.org/wikipedia/commons/7/72/Anna_Wintour_by_David_Shankbone_edited-1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/What_Makes_Anna_Wintour_Smile%3F_%282842365867%29.jpg/960px-What_Makes_Anna_Wintour_Smile%3F_%282842365867%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/af/Anna_Wintour_2019_crop.jpg",
	],
	"Marc Jacobs": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Marc_Jacobs_Fall-Winter_2012_03.jpg/960px-Marc_Jacobs_Fall-Winter_2012_03.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Marc_Jacobs_SXSW_2017_%28cropped%29.jpg/960px-Marc_Jacobs_SXSW_2017_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Daisy_by_Marc_Jacobs.jpg/960px-Daisy_by_Marc_Jacobs.jpg",
	],
	"Victoria Beckham": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Victoria_Beckham_and_the_Spice_Girls_in_Las_Vegas_2007.jpg/960px-Victoria_Beckham_and_the_Spice_Girls_in_Las_Vegas_2007.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Victoria_Beckham_%28Headshot%29.jpg/960px-Victoria_Beckham_%28Headshot%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Victoria_Beckham_2010.jpg/960px-Victoria_Beckham_2010.jpg",
	],
	"Tom Ford": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tom_Ford_PHC_2015-2.jpg/960px-Tom_Ford_PHC_2015-2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Clare_Stewart%2C_Tom_Ford_and_Amy_Adams_%2830029364260%29.jpg/960px-Clare_Stewart%2C_Tom_Ford_and_Amy_Adams_%2830029364260%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tom_Ford%2C_Amy_Adams%2C_Aaron_Taylor-Johnson_%2830210069502%29.jpg/960px-Tom_Ford%2C_Amy_Adams%2C_Aaron_Taylor-Johnson_%2830210069502%29.jpg",
	],
	"Christian Louboutin": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Nicky_Hilton_in_Studded_Christian_Louboutin_02.jpg/960px-Nicky_Hilton_in_Studded_Christian_Louboutin_02.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Store_of_Christian_Louboutin%2C_by_Phillip_Pessar.jpg/960px-Store_of_Christian_Louboutin%2C_by_Phillip_Pessar.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Christian_Louboutin.jpg/960px-Christian_Louboutin.jpg",
	],
	"Alexander Wang": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Alexander_Wang_FW10.jpg/960px-Alexander_Wang_FW10.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Alexander_Wang_Photo_by_Ed_Kavishe_Fashion_Wire_Press.jpg/960px-Alexander_Wang_Photo_by_Ed_Kavishe_Fashion_Wire_Press.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Alexander_Wang_Miami_Design_District.jpg/960px-Alexander_Wang_Miami_Design_District.jpg",
	],
	"Stella McCartney": [
		"https://upload.wikimedia.org/wikipedia/commons/0/08/Stella_McCartney_2014_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/da/Stella_McCartney.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/7b/Stella_McCartney_London_2014_cropped.jpg",
	],
	"Donatella Versace": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Donatella_Versace_2010_Time_Shankbone.jpg/960px-Donatella_Versace_2010_Time_Shankbone.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Donatella_Versace_David_Shankbone_2010_NYC.jpg/960px-Donatella_Versace_David_Shankbone_2010_NYC.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Donatella_Versace_Shankbone_2010.jpg/960px-Donatella_Versace_Shankbone_2010.jpg",
	],
	"Kim Kardashian": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Kim_Kardashian_%288002635966%29.jpg/960px-Kim_Kardashian_%288002635966%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kim_Kardashian_%288002632155%29.jpg/960px-Kim_Kardashian_%288002632155%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/d/d5/Kim_Kardashian_%286308126618%29.jpg",
	],
	"Kris Jenner": [
		"https://upload.wikimedia.org/wikipedia/commons/8/84/Kris_Jenner.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/65/Kris_Jenner_shot_by_Jim_Jordan_at_White_Cross_Studios_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/7/74/Kris_Jenner_%28cropped%29.jpg",
	],
	"Naomi Campbell": [
		"https://media.vogue.fr/photos/64997c134e2f1d2bfa5413df/3:4/w_2560%2Cc_limit/1491756125",
		"https://www.datocms-assets.com/63746/1646364157-1603962980352246-naomi-campbell-young-birhtday.jpg?auto=format&fit=max&w=1200",
	],
	"Cindy Crawford": [
		"https://upload.wikimedia.org/wikipedia/commons/1/17/Cindy_Crawford_%28porn_star%29_adjusted.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0a/Cindy_Crawford%2C_Tyra_Banxxx_at_2005_AEE_Awards_4.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/b/b9/Cindy_Crawford_Cannes_2013_2.jpg",
	],
	"Gisele Bündchen": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Ver%C3%A3o_Arezzo_Brasil_2019_por_Gisele_B%C3%BCndchen_04.jpg/960px-Ver%C3%A3o_Arezzo_Brasil_2019_por_Gisele_B%C3%BCndchen_04.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b5/Ver%C3%A3o_Arezzo_Brasil_2019_por_Gisele_B%C3%BCndchen_17.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/54/Ver%C3%A3o_Arezzo_Brasil_2019_por_Gisele_B%C3%BCndchen_16.jpg",
	],
	"Kate Moss": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Kate_moss.jpg/960px-Kate_moss.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Cara_Delevingne_kate_moss_mario_testino.jpg/960px-Cara_Delevingne_kate_moss_mario_testino.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cara_Delevingne_and_Kate_Moss_%2815072898230%29.jpg/960px-Cara_Delevingne_and_Kate_Moss_%2815072898230%29.jpg",
	],
	"Bella Hadid": [
		"https://upload.wikimedia.org/wikipedia/commons/e/e2/Bella_Hadid_Cannes_2018.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/3a/Bella_Hadid_Cannes_2018_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/17/Bella_Hadid_Met_Gala_2017.jpg",
	],
	"Jeff Koons": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Jeff_Koons_La_Gazette.JPG/960px-Jeff_Koons_La_Gazette.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/A_Bibao_-_Puppy_-_de_Jeff_Koons.jpg/960px-A_Bibao_-_Puppy_-_de_Jeff_Koons.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/BMW-Art-Car_2010_Jeff_Koons.JPG/960px-BMW-Art-Car_2010_Jeff_Koons.JPG",
	],
	"Ai Weiwei": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Bye_Bye_Ai_Weiwei_Venice.jpg/960px-Bye_Bye_Ai_Weiwei_Venice.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bridge_Ai_WeiWei.jpg/960px-Bridge_Ai_WeiWei.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ai_Weiwei_translocation_%E2%80%93_transformation_exhibition_belvedere_3.jpg/960px-Ai_Weiwei_translocation_%E2%80%93_transformation_exhibition_belvedere_3.jpg",
	],
	"JR Photographe": [
		"https://upload.wikimedia.org/wikipedia/commons/f/fc/JR_%28artist%29_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/JR_%C3%AEle_Saint-Louis_2009.jpg/960px-JR_%C3%AEle_Saint-Louis_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/L%27artiste_JR_investit_le_Panth%C3%A9on_%28Paris%29_%2814438708334%29.jpg/960px-L%27artiste_JR_investit_le_Panth%C3%A9on_%28Paris%29_%2814438708334%29.jpg",
	],
	"Philippe Starck": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Philippe_Starck.jpg/960px-Philippe_Starck.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Philippe_Starck_crop.jpg/960px-Philippe_Starck_crop.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Gun_Philippe_Starck_FLOS_%286837512261%29.jpg/960px-Gun_Philippe_Starck_FLOS_%286837512261%29.jpg",
	],
	"Jim Carrey": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Jim_Carrey.jpg/960px-Jim_Carrey.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Jim_Carrey_Hands.jpg/960px-Jim_Carrey_Hands.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/6b/Jim_Carrey_Cannes_2009_%28cropped%29.jpg",
	],
	"Adam Sandler": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Kate_Beckinsale%2C_Adam_Sandler_and_David_Hasselhoff.jpg/960px-Kate_Beckinsale%2C_Adam_Sandler_and_David_Hasselhoff.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Adam_Sandler_footprint.jpg/960px-Adam_Sandler_footprint.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/40/Adam_Sandler_Cannes_2017.jpg",
	],
	"Kevin Hart": [
		"https://upload.wikimedia.org/wikipedia/commons/2/22/DSC_Kevin_Hart_%28baseball%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Kevin_Hart_2014.jpg/960px-Kevin_Hart_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kevin_Hart_%2815789082870%29.jpg/960px-Kevin_Hart_%2815789082870%29.jpg",
	],
	"Ellen DeGeneres": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Ellen_DeGeneres.jpg/960px-Ellen_DeGeneres.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Ellen_DeGeneres-2009-enh2.jpg/960px-Ellen_DeGeneres-2009-enh2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ellen_DeGeneres-2009-enh5.jpg/960px-Ellen_DeGeneres-2009-enh5.jpg",
	],
	"Rowan Atkinson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rowan_Atkinson_in_2009.jpg/960px-Rowan_Atkinson_in_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Rowan_Atkinson_on_a_Mini_at_Goodwood_Circuit_in_2009.jpg/960px-Rowan_Atkinson_on_a_Mini_at_Goodwood_Circuit_in_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Rowan_Atkinson_%40_Mr_bean%27s_Holiday_premiere_02.jpg/960px-Rowan_Atkinson_%40_Mr_bean%27s_Holiday_premiere_02.jpg",
	],
	"Gad Elmaleh": [
		"https://upload.wikimedia.org/wikipedia/commons/5/58/Gad_Elmaleh_apr%C3%A8s_son_spectacle_%C3%A0_Montr%C3%A9al%2C_Septembre_2006.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e4/Omar_Sharif_Gad_Elmaleh_C%C3%A9sars.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/4f/Gad_Elmaleh_Deauville_2010.jpg",
	],
	"Florence Foresti": [
		"https://upload.wikimedia.org/wikipedia/commons/e/ef/Florence_Foresti_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/b/b1/Florence_Foresti_Cannes_2015_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/e9/Florence_Foresti_Cannes_2015.jpg",
	],
	"Kev Adams": [
		"https://upload.wikimedia.org/wikipedia/commons/0/0b/Kev_Adams_Deauville_2011.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/2d/Kev_Adams_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/c/cc/Kev_Adams_C%C3%A9sars_2014_3.jpg",
	],
	"Jamel Debbouze": [
		"https://upload.wikimedia.org/wikipedia/commons/8/88/Jamel_Debbouze_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/fb/Jamel_Debbouze_Cannes_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Festival_des_Vieilles_Charrues_2019_-_Jamel_Debbouze_-_003.jpg/960px-Festival_des_Vieilles_Charrues_2019_-_Jamel_Debbouze_-_003.jpg",
	],
	"Blanche Gardin": [
		"https://upload.wikimedia.org/wikipedia/commons/9/96/Blanche_Gardin.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Blanche_Gardin_2016.png/960px-Blanche_Gardin_2016.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Blanche_Gardin_et_Fran%C3%A7oise_Lebrun.jpg/960px-Blanche_Gardin_et_Fran%C3%A7oise_Lebrun.jpg",
	],
	"Alexandre Astier": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Alexandre_Astier_-_Que_ma_joie_demeure.jpg/960px-Alexandre_Astier_-_Que_ma_joie_demeure.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Alexandre_Astier_20120705_Japan_Expo_1.jpg/960px-Alexandre_Astier_20120705_Japan_Expo_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Alexandre_Astier_-_L%27Exoconf%C3%A9rence.jpg/960px-Alexandre_Astier_-_L%27Exoconf%C3%A9rence.jpg",
	],
	"Norman Thavaud": [
		"https://upload.wikimedia.org/wikipedia/commons/3/3d/Norman_Thavaud_Cannes_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/65/Normanscene.png",
	],
	"Cyprien Iov": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Monsieur_Dream_-_Cyprien_Iov.jpg/960px-Monsieur_Dream_-_Cyprien_Iov.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Minori-cyprien_Iov.jpg/960px-Minori-cyprien_Iov.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Cyprien_Iov_2025.jpg/960px-Cyprien_Iov_2025.jpg",
	],
	"Ricky Gervais": [
		"https://upload.wikimedia.org/wikipedia/commons/7/7e/Ricky_Gervais_performing_2007.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0c/Ricky_Gervais_performing_2007_%281%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ricky_Gervais_2010.jpg/960px-Ricky_Gervais_2010.jpg",
	],
	"Trevor Noah": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Trevor_Noah_2019-02-01_-_Trevor_Noah_%2846341086144%29.jpg/960px-Trevor_Noah_2019-02-01_-_Trevor_Noah_%2846341086144%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Trevor_Noah_2019-02-01_-_Trevor_Noah_%2846151353175%29.jpg/960px-Trevor_Noah_2019-02-01_-_Trevor_Noah_%2846151353175%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Trevor_Noah_2019-02-01_-_Trevor_Noah_%2846151351205%29.jpg/960px-Trevor_Noah_2019-02-01_-_Trevor_Noah_%2846151351205%29.jpg",
	],
	"Gordon Ramsay": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Scottish_lobster_and_english_chicken_farm_in_Gordon_Ramsay_restaurant.JPG/960px-Scottish_lobster_and_english_chicken_farm_in_Gordon_Ramsay_restaurant.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Gordon_Ramsay_at_the_London_%282977678280%29.jpg/960px-Gordon_Ramsay_at_the_London_%282977678280%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Paris_Gordon_Ramsay_Steak_entrance_%288319988720%29.jpg/960px-Paris_Gordon_Ramsay_Steak_entrance_%288319988720%29.jpg",
	],
	"Cyril Lignac": [
		"https://upload.wikimedia.org/wikipedia/commons/1/1c/Cyril-lignac.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/%C3%89miett%C3%A9e_de_tourteau_%28Cyril_Lignac%29.jpg/960px-%C3%89miett%C3%A9e_de_tourteau_%28Cyril_Lignac%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cr%C3%AApes_%C3%A0_la_vanille_%28Cyril_Lignac%29.jpg/960px-Cr%C3%AApes_%C3%A0_la_vanille_%28Cyril_Lignac%29.jpg",
	],
	"Alain Ducasse": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Stunning_Table_Lumi%C3%A8re_at_Alain_Ducasse_at_The_Dorchester.jpg/960px-Stunning_Table_Lumi%C3%A8re_at_Alain_Ducasse_at_The_Dorchester.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Espresso_at_Le_Caf%C3%A9_Alain_Ducasse%2C_Coal_Drops_Yard%2C_King%27s_Cross.jpg/960px-Espresso_at_Le_Caf%C3%A9_Alain_Ducasse%2C_Coal_Drops_Yard%2C_King%27s_Cross.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Le_Caf%C3%A9_Alain_Ducasse%2C_Coal_Drops_Yard%2C_King%27s_Cross_%2846731223131%29.jpg/960px-Le_Caf%C3%A9_Alain_Ducasse%2C_Coal_Drops_Yard%2C_King%27s_Cross_%2846731223131%29.jpg",
	],
	"Anne-Sophie Pic": [
		"https://upload.wikimedia.org/wikipedia/commons/d/de/Anne-Sophie_Pic_sepia.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Anne-Sophie_Pic.jpg/960px-Anne-Sophie_Pic.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Anne-Sophie_Pic_par_Claude_Truong-Ngoc_mars_2014.jpg/960px-Anne-Sophie_Pic_par_Claude_Truong-Ngoc_mars_2014.jpg",
	],
	"Philippe Etchebest": [
		"https://upload.wikimedia.org/wikipedia/commons/2/2f/Philippe_Etchebest_in_2018.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/L%27Aurore_Philippe_Magnier_Louvre_MR3243.JPG/960px-L%27Aurore_Philippe_Magnier_Louvre_MR3243.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Triple_Portrait_of_Cardinal_de_Richelieu_probably_1642%2C_Philippe_de_Champaigne.jpg/960px-Triple_Portrait_of_Cardinal_de_Richelieu_probably_1642%2C_Philippe_de_Champaigne.jpg",
	],
	"Jamie Oliver": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Jamie_Oliver.png/960px-Jamie_Oliver.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Jamie_Oliver_retouched.jpg/960px-Jamie_Oliver_retouched.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Jamie_Oliver_cropped.png/960px-Jamie_Oliver_cropped.png",
	],
	"Massimo Bottura": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Massimo_Bottura%2C_from_World%27s_50_Best_Restaurants_Awards_2012.JPG/960px-Massimo_Bottura%2C_from_World%27s_50_Best_Restaurants_Awards_2012.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Massimo_Bottura_Rimini.jpg/960px-Massimo_Bottura_Rimini.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Massimo_Bottura_%286871034795%29.jpg/960px-Massimo_Bottura_%286871034795%29.jpg",
	],
	"Hélène Darroze": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Restaurant_H%C3%A9l%C3%A8ne_Darroze.jpg/960px-Restaurant_H%C3%A9l%C3%A8ne_Darroze.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/H%C3%A9l%C3%A8ne_Darroze.jpg/960px-H%C3%A9l%C3%A8ne_Darroze.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tartare_huitre_caviar_H%C3%A9l%C3%A8ne_Darroze.JPG/960px-Tartare_huitre_caviar_H%C3%A9l%C3%A8ne_Darroze.JPG",
	],
	"Ferran Adrià": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Ferran_Adri%C3%A0_i_el_Bulli_exhibit_Palau_Robert_Barcelona_%2811%29.JPG/960px-Ferran_Adri%C3%A0_i_el_Bulli_exhibit_Palau_Robert_Barcelona_%2811%29.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ferran_Adri%C3%A0_i_el_Bulli_exhibit_Palau_Robert_Barcelona_%282%29.JPG/960px-Ferran_Adri%C3%A0_i_el_Bulli_exhibit_Palau_Robert_Barcelona_%282%29.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Ferran_Adri%C3%A0_i_el_Bulli_exhibit_Palau_Robert_Barcelona_%2825%29.JPG/960px-Ferran_Adri%C3%A0_i_el_Bulli_exhibit_Palau_Robert_Barcelona_%2825%29.JPG",
	],
	"Christophe Michalak": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/O_chef_p%C3%A2tissier_Christophe_Michalak_%2827917041430%29.jpg/960px-O_chef_p%C3%A2tissier_Christophe_Michalak_%2827917041430%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Christophe_Michalak_2015.jpg/960px-Christophe_Michalak_2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Christophe_Michalak_2015_%28cropped00%29.jpg/960px-Christophe_Michalak_2015_%28cropped00%29.jpg",
	],
	"Jimmy Donaldson": [
		"https://upload.wikimedia.org/wikipedia/commons/b/ba/MrBeast_in_a_YouTube_Video_in_2022.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/MrBeast_Burger_01.jpg/960px-MrBeast_Burger_01.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/MrBeast_Burger_restaurant_17.jpg/960px-MrBeast_Burger_restaurant_17.jpg",
	],
	"Felix Kjellberg": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/PewDiePie_fanart.jpg/960px-PewDiePie_fanart.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/PewDiePie_at_PAX_2015_crop.jpg/960px-PewDiePie_at_PAX_2015_crop.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/9/9c/PewDiePie_on_Cold_Ones_-_1_%28cropped%29.png",
	],
	"Kylie Jenner": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kylie_Jenner_headshot.jpg/960px-Kylie_Jenner_headshot.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/9/9a/Kylie_Jenner.png",
		"https://upload.wikimedia.org/wikipedia/commons/9/95/Kylie_Jenner_Complex_2.png",
	],
	"Charli D'Amelio": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Charli_D%27Amelio.jpg/960px-Charli_D%27Amelio.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Charli_D%27Amelio_3.jpg/960px-Charli_D%27Amelio_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/1e/Charli_D%27Amelio_on_being_bullied_online_-_UNICEF_-_HD_%28cropped%29.png",
	],
	"Khaby Lame": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Khaby_Lame%2C_Nov_2025_%28cropped%29.jpg/960px-Khaby_Lame%2C_Nov_2025_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Khaby_Lame_%2854914155192%29.jpg/960px-Khaby_Lame_%2854914155192%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Khaby_Lame_%2854915220443%29.jpg/960px-Khaby_Lame_%2854915220443%29.jpg",
	],
	"Lucas Hauchard": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/P-51D_Mustang_nicknamed_%22Squeezie%22_of_the_325th_Fighter_Group%2C_15th_Air_Force_in_flight.jpg/960px-P-51D_Mustang_nicknamed_%22Squeezie%22_of_the_325th_Fighter_Group%2C_15th_Air_Force_in_flight.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/f0/Squeezie.png",
		"https://upload.wikimedia.org/wikipedia/commons/4/4e/Squeezie-2.jpg",
	],
	"Michel Roux": [
		"https://upload.wikimedia.org/wikipedia/commons/8/8e/Michou.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a6/Michou_2023.jpg",
	],
	"Léna Mahfouf": [
		"https://resize.elle.fr/original/var/plain_site/storage/images/people/la-vie-des-people/news/lena-situations-de-youtubeuse-a-entrepreneuse-a-succes-son-evolution-en-images/105718737-1-fre-FR/Lena-Situations-de-youtubeuse-a-entrepreneuse-a-succes-son-evolution-en-images.jpg",
		"https://i.f1g.fr/media/cms/768x1024_cropupscale/2024/11/15/a7c077841bee207652fb7c68ab520af08f4274c3a92493f541af3d45df42b0ea.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/ea/L%C3%A9na_Situations_during_the_MiuMiu_Fashion_Show.png",
	],
	"Marie Lopez": [
		"https://upload.wikimedia.org/wikipedia/commons/1/11/EnjoyPhoenix_mollat2015.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Marie_Lopez_%28EnjoyPhoenix%29%2C_lors_du_ZEVENT_2025.jpg/960px-Marie_Lopez_%28EnjoyPhoenix%29%2C_lors_du_ZEVENT_2025.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Marie_Lopez_Strasbourg_23_mai_2015.jpg/960px-Marie_Lopez_Strasbourg_23_mai_2015.jpg",
	],
	"Amir Boustani": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Amixem_en_janvier_2022_dans_2ack_en_Roue_Libre.png/960px-Amixem_en_janvier_2022_dans_2ack_en_Roue_Libre.png",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Zion_Amir.jpg/960px-Zion_Amir.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Sultan_Amir_Ahmad_Bathhouse1.jpg/960px-Sultan_Amir_Ahmad_Bathhouse1.jpg",
	],
	"Inox Tag": [
		"https://upload.wikimedia.org/wikipedia/commons/1/13/Inoxtag.png",
		"https://upload.wikimedia.org/wikipedia/commons/c/ca/Inoxtag_extrait.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/36/Inoxtag_en_2023.png",
	],
	"Emma Chamberlain": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Emma_Chamberlain_playing_two_short_sets_at_Lostfest_14th_May_2017.jpg/960px-Emma_Chamberlain_playing_two_short_sets_at_Lostfest_14th_May_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/38/Emma_Chamberlain_2019_vidcon.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Emma_Chamberlain_for_Chamberlain_Coffee%2C_2020_%281%29.png/960px-Emma_Chamberlain_for_Chamberlain_Coffee%2C_2020_%281%29.png",
	],
	"Zoe Sugg": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Zoella_Lykes_New_Orleans-ST-158-44-62.jpg/960px-Zoella_Lykes_New_Orleans-ST-158-44-62.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Zoella_at_Teen_Awards_2013.jpg/960px-Zoella_at_Teen_Awards_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/32/Zoella_at_Teen_Awards_2013_%28cropped%29.jpg",
	],
	"Casey Neistat": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Casey_Neistat_%40_SXSW_2017_%2833505910606%29.jpg/960px-Casey_Neistat_%40_SXSW_2017_%2833505910606%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Casey_Neistat_%40_SXSW_2017_%2832732368133%29.jpg/960px-Casey_Neistat_%40_SXSW_2017_%2832732368133%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Casey_Neistat_%40_SXSW_2017_%2832732367143%29.jpg/960px-Casey_Neistat_%40_SXSW_2017_%2832732367143%29.jpg",
	],
	"Addison Rae": [
		"https://upload.wikimedia.org/wikipedia/commons/1/12/Addison_Rae.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/f/f3/Addison_Rae_portrait.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/ee/Addison_Rae_-_Pandora_2021.jpg",
	],
	"Walter White": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Walter_White_cosplayer_%2812165080846%29.jpg/960px-Walter_White_cosplayer_%2812165080846%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Me_as_Walter_White_when_I_shaved_my_head_in_the_Summer_of_2017.jpg/960px-Me_as_Walter_White_when_I_shaved_my_head_in_the_Summer_of_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/8/89/Hazmat_suit_and_mask_worn_by_Walter_White_in_the_T.V._show_%22Breaking_Bad%22.jpg",
	],
	"Tony Soprano": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Bacchus_XXXIX_James_Gandolfini.jpg/960px-Bacchus_XXXIX_James_Gandolfini.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Bacchus_XXXIX_James_Gandolfini_Box.jpg/960px-Bacchus_XXXIX_James_Gandolfini_Box.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Rose_McGowan_James_Gandolfini_100331-N-0696M-280.jpg/960px-Rose_McGowan_James_Gandolfini_100331-N-0696M-280.jpg",
	],
	"Don Draper": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jon_Hamm_Vancouver_Olympics_2010.jpg/960px-Jon_Hamm_Vancouver_Olympics_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/9/9f/Jon_Hamm_%40_Toronto_International_Film_Festival_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jon_Hamm_2010.jpg/960px-Jon_Hamm_2010.jpg",
	],
	"Daenerys Targaryen": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Comic_Con_2013_-_Daenerys_Targaryen_and_Merida_%289333205097%29.jpg/960px-Comic_Con_2013_-_Daenerys_Targaryen_and_Merida_%289333205097%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Comic_Con_2013_-_Daenerys_Targaryen_%289333190925%29.jpg/960px-Comic_Con_2013_-_Daenerys_Targaryen_%289333190925%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/MCM_London_2014_-_Daenerys_Targaryen_%2814083684308%29.jpg/960px-MCM_London_2014_-_Daenerys_Targaryen_%2814083684308%29.jpg",
	],
	"Jon Snow": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/NYCC_2014_-_Jon_Snow_%26_Ygritte_%2815497879961%29.jpg/960px-NYCC_2014_-_Jon_Snow_%26_Ygritte_%2815497879961%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/2/20/C2E2_2015_-_Ygritte_%26_Jon_Snow_%2817306138525%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/5a/Special_Edition_NYC_2015_-_Jon_Snow_Knows_Nothing_%2818357799778%29.jpg",
	],
	"Tyrion Lannister": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Fantasy_Worlds_of_Myth_and_Magic%2C_EMP%2C_Seattle_-_Game_of_Thrones._Tyrion_Lannister_%2815632485707%29.jpg/960px-Fantasy_Worlds_of_Myth_and_Magic%2C_EMP%2C_Seattle_-_Game_of_Thrones._Tyrion_Lannister_%2815632485707%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/4/44/A_Song_of_Ice_and_Fire_arms_of_Tyrion_Lannister.png",
		"https://upload.wikimedia.org/wikipedia/commons/b/b7/Bryn_Tyrion_looking_up_%3B_Bryn_Tyrion_looking_down%2C_near_Skiviog_1795.jpg",
	],
	"Jane Hopper": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Cosplay_of_Jane_Doe_DSCF0926.jpg/960px-Cosplay_of_Jane_Doe_DSCF0926.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cosplay_of_Jane_Doe_DSCF0924.jpg/960px-Cosplay_of_Jane_Doe_DSCF0924.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cosplay_of_Jane_Doe_F999999_key_-_54112702822.jpg/960px-Cosplay_of_Jane_Doe_F999999_key_-_54112702822.jpg",
	],
	"Mike Wheeler": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/New_York_City_Mayor_Mike_Bloomberg_at_Midtown_Comics.jpg/960px-New_York_City_Mayor_Mike_Bloomberg_at_Midtown_Comics.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/New_York_City_Mayor_Mike_Bloomberg_at_Midtown_Comics2.jpg/960px-New_York_City_Mayor_Mike_Bloomberg_at_Midtown_Comics2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/e/ee/Mike_Riley_at_Baltimore_Comic-Con_2011.jpg",
	],
	"Rachel Green": [
		"https://upload.wikimedia.org/wikipedia/commons/a/a2/Momiji_and_Rachel_TGS_09_cosplayers.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Cosplay_Rachel_Summers_Dragon_Con_2013.jpg/960px-Cosplay_Rachel_Summers_Dragon_Con_2013.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Emma_Frost_and_Rachel_Grey_%2810126404534%29.jpg/960px-Emma_Frost_and_Rachel_Grey_%2810126404534%29.jpg",
	],
	"Ross Geller": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/David_Schwimmer_%28director%29.jpg/960px-David_Schwimmer_%28director%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/David_Schwimmer.jpg/960px-David_Schwimmer.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/David_Schwimmer_Jul_2005_London%2C_England_Crop1.jpg/960px-David_Schwimmer_Jul_2005_London%2C_England_Crop1.jpg",
	],
	"Sherlock Holmes": [
		"https://upload.wikimedia.org/wikipedia/commons/c/cd/Benedict_Cumberbatch_filming_Sherlock_cropped.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0f/Benedict_Cumberbatch_filming_Sherlock_cropped2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Benedict_Cumberbatch_SDCC_2014.jpg/960px-Benedict_Cumberbatch_SDCC_2014.jpg",
	],
	"Michael Scott": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Steve_Carell_2010.jpg/960px-Steve_Carell_2010.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Paul_Rudd%2C_Steve_Carell_%2811024131575%29.jpg/960px-Paul_Rudd%2C_Steve_Carell_%2811024131575%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Steve_Carell_at_TIFF.jpg/960px-Steve_Carell_at_TIFF.jpg",
	],
	"Jack Bauer": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kiefer_Sutherland_December_2007.jpg/960px-Kiefer_Sutherland_December_2007.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Kiefer_Sutherland_at_24_Redemption_premiere_5.jpg/960px-Kiefer_Sutherland_at_24_Redemption_premiere_5.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/1/10/Kiefer_Sutherland_December_2007_%28cropped%29_2.jpg",
	],
	"Carrie Bradshaw": [
		"https://upload.wikimedia.org/wikipedia/commons/7/7e/Sarah_Jessica_Parker_2.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Sarah_Jessica_Parker_2008.jpg/960px-Sarah_Jessica_Parker_2008.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Sarah_Jessica_Parker_4_Shankbone_2009_Tribeca.jpg/960px-Sarah_Jessica_Parker_4_Shankbone_2009_Tribeca.jpg",
	],
	"Villanelle Astankova": [
		"https://upload.wikimedia.org/wikipedia/commons/b/b4/Jodie_Comer_during_an_interview%2C_August_2021_%28cropped%29.png",
		"https://upload.wikimedia.org/wikipedia/commons/1/17/Jodie_comer_2023_1.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/0/0f/Jodie_comer_2023_4.jpg",
	],
	"Naruto Uzumaki": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Cosplay_-_Naruto_Uzumaki_and_Sakura_Haruno.jpg/960px-Cosplay_-_Naruto_Uzumaki_and_Sakura_Haruno.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cosplay_-_AWA15_-_Naruto_Uzumaki_%283982533553%29.jpg/960px-Cosplay_-_AWA15_-_Naruto_Uzumaki_%283982533553%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Cosplay_-_AWA15_-_Naruto_Uzumaki_and_Jiraiya_%283982151770%29.jpg/960px-Cosplay_-_AWA15_-_Naruto_Uzumaki_and_Jiraiya_%283982151770%29.jpg",
	],
	"Sasuke Uchiha": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Cosplayers_of_Sasuke_Uchiha_and_Naruto_Uzumaki_at_CWT39_20150228a.jpg/960px-Cosplayers_of_Sasuke_Uchiha_and_Naruto_Uzumaki_at_CWT39_20150228a.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cosplayers_of_Sasuke_Uchiha_and_Naruto_Uzumaki_at_CWT39_20150228b.jpg/960px-Cosplayers_of_Sasuke_Uchiha_and_Naruto_Uzumaki_at_CWT39_20150228b.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Cosplayers_of_Sasuke_Uchiha_and_Naruto_Uzumaki_at_CWT39_20150228c.jpg/960px-Cosplayers_of_Sasuke_Uchiha_and_Naruto_Uzumaki_at_CWT39_20150228c.jpg",
	],
	"Monkey D. Luffy": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Cosplay_of_Monkey_D._Luffy%2C_New_York_Comic_Con_2011_%286273053112%29.jpg/960px-Cosplay_of_Monkey_D._Luffy%2C_New_York_Comic_Con_2011_%286273053112%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Cosplay_-_AWA15_-_Monkey_D._Luffy_%283982426960%29.jpg/960px-Cosplay_-_AWA15_-_Monkey_D._Luffy_%283982426960%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Monkey_D._Luffy_crossplay_at_Japan_Expo_2016_%284%29.jpg/960px-Monkey_D._Luffy_crossplay_at_Japan_Expo_2016_%284%29.jpg",
	],
	"Roronoa Zoro": [
		"https://upload.wikimedia.org/wikipedia/commons/0/05/Cosplay_Roronoa_Zoro.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Cosplay_of_Roronoa_Zoro%2C_Anime_Expo_2012_%2814024501453%29.jpg/960px-Cosplay_of_Roronoa_Zoro%2C_Anime_Expo_2012_%2814024501453%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Cosplay_of_Roronoa_Zoro%2C_Anime_Expo_2016%2C_Day_1.jpg/960px-Cosplay_of_Roronoa_Zoro%2C_Anime_Expo_2016%2C_Day_1.jpg",
	],
	"Nami Bellemère": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Cosplayer_of_Nami%2C_One_Piece_at_FF26_20150830a.jpg/960px-Cosplayer_of_Nami%2C_One_Piece_at_FF26_20150830a.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cosplayers_of_Nami_and_Reimu_Hakurei_at_Petit_Fancy_24_2016_0508a.jpg/960px-Cosplayers_of_Nami_and_Reimu_Hakurei_at_Petit_Fancy_24_2016_0508a.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Cosplayer_of_Nami%2C_One_Piece_at_PF24_20160508a.jpg/960px-Cosplayer_of_Nami%2C_One_Piece_at_PF24_20160508a.jpg",
	],
	"Son Goku": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cosplayers_of_Son_Goku_and_Majin_Boo%2C_Dragon_Ball_Z_at_Anime_Expo_20100702.jpg/960px-Cosplayers_of_Son_Goku_and_Majin_Boo%2C_Dragon_Ball_Z_at_Anime_Expo_20100702.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Son_Goku_Cosplayer_at_Fanime_2009.jpg/960px-Son_Goku_Cosplayer_at_Fanime_2009.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Son_Goku_cosplay.jpg/960px-Son_Goku_cosplay.jpg",
	],
	"Vegeta Saiyan": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/WonderCon_2012_-_Vegeta_Homer_%287019140867%29.jpg/960px-WonderCon_2012_-_Vegeta_Homer_%287019140867%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/WonderCon_2015_-_Homer_Vegeta_%2816862067870%29.jpg/960px-WonderCon_2015_-_Homer_Vegeta_%2816862067870%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Fan_Expo_2015_-_Vegeta_%2821580275998%29.jpg/960px-Fan_Expo_2015_-_Vegeta_%2821580275998%29.jpg",
	],
	"Levi Ackerman": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Cosplayer_of_Levi_Ackerman%2C_Attack_on_Titan_in_FF25_20150201a.jpg/960px-Cosplayer_of_Levi_Ackerman%2C_Attack_on_Titan_in_FF25_20150201a.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/San_Diego_Comic-Con_2014_-_Levi_%2814791463873%29.jpg/960px-San_Diego_Comic-Con_2014_-_Levi_%2814791463873%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Erwin_Smith%2C_Zo%C3%AB_Hange%2C_and_Levi_%2819387919414%29.jpg/960px-Erwin_Smith%2C_Zo%C3%AB_Hange%2C_and_Levi_%2819387919414%29.jpg",
	],
	"Eren Yeager": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Cosplay_of_Eren_Yeager%2C_Mikasa_Ackerman_and_Armin_Arlert_from_Attack_on_Titan_at_the_2013_Comic_World_Seoul_%28041%29.jpg/960px-Cosplay_of_Eren_Yeager%2C_Mikasa_Ackerman_and_Armin_Arlert_from_Attack_on_Titan_at_the_2013_Comic_World_Seoul_%28041%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Cosplay_of_Eren_Yeager.jpg/960px-Cosplay_of_Eren_Yeager.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Cosplay_of_Eren_Yeager_and_The_Female_Titan_%28Annie_Leonhart%29_from_Attack_on_Titan_at_FanimeCon_2023_%2853055638546%29.jpg/960px-Cosplay_of_Eren_Yeager_and_The_Female_Titan_%28Annie_Leonhart%29_from_Attack_on_Titan_at_FanimeCon_2023_%2853055638546%29.jpg",
	],
	"Mikasa Ackerman": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Cosplay_of_Eren_Yeager%2C_Mikasa_Ackerman_and_Armin_Arlert_from_Attack_on_Titan_at_the_2013_Comic_World_Seoul_%28041%29.jpg/960px-Cosplay_of_Eren_Yeager%2C_Mikasa_Ackerman_and_Armin_Arlert_from_Attack_on_Titan_at_the_2013_Comic_World_Seoul_%28041%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cosplay_of_Mikasa_Ackerman_from_Attack_on_Titan_at_Fancy_Frontier_24_%28FF24_DSC7887_30.jpg/960px-Cosplay_of_Mikasa_Ackerman_from_Attack_on_Titan_at_Fancy_Frontier_24_%28FF24_DSC7887_30.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Cosplay_of_Touka_Kirishima_from_Tokyo_Ghoul_and_Mikasa_Ackerman_from_Attack_on_Titan_at_Japan_Expo_2023%2C_Day_2_%2853056237308%29.jpg/960px-Cosplay_of_Touka_Kirishima_from_Tokyo_Ghoul_and_Mikasa_Ackerman_from_Attack_on_Titan_at_Japan_Expo_2023%2C_Day_2_%2853056237308%29.jpg",
	],
	"Light Yagami": [
		"https://i.redd.it/ikjmfjp2f6of1.jpeg",
	],
	"L Lawliet": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Cosplay_of_L_Lawliet%2C_with_satchel%2C_Otakon_2012.jpg/960px-Cosplay_of_L_Lawliet%2C_with_satchel%2C_Otakon_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a7/Cosplayers_of_Misa_Amane_and_L_Lawliet%2C_Death_Note_at_Anime_Expo_2010_Day_3.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Cosplayer_of_L_Lawliet_lying_on_the_ground_20060813.jpg/960px-Cosplayer_of_L_Lawliet_lying_on_the_ground_20060813.jpg",
	],
	"Edward Elric": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Edward_Elric_cosplayer_at_2010_NCCBF_2010-04-18_1.JPG/960px-Edward_Elric_cosplayer_at_2010_NCCBF_2010-04-18_1.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Edward_Elric_cosplayer_at_2010_NCCBF_2010-04-18_2.JPG/960px-Edward_Elric_cosplayer_at_2010_NCCBF_2010-04-18_2.JPG",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Edward_Elric_cosplayer_at_FanimeCon_2010-05-31.JPG/960px-Edward_Elric_cosplayer_at_FanimeCon_2010-05-31.JPG",
	],
	"Tanjiro Kamado": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Cosplay_of_Hinatsuru_and_Tanjiro_Kamado_from_Demon_Slayer_Kimetsu_no_Yaiba_and_Makima_from_Chainsaw_Man_at_Necronomi%E2%80%99Con_2023%2C_Andelnans.jpg/960px-Cosplay_of_Hinatsuru_and_Tanjiro_Kamado_from_Demon_Slayer_Kimetsu_no_Yaiba_and_Makima_from_Chainsaw_Man_at_Necronomi%E2%80%99Con_2023%2C_Andelnans.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Cosplay_of_Tanjiro_Kamado_from_Demon_Slayer_Kimetsu_no_Yaiba_at_FanimeCon_2023_%2853055827324%29.jpg/960px-Cosplay_of_Tanjiro_Kamado_from_Demon_Slayer_Kimetsu_no_Yaiba_at_FanimeCon_2023_%2853055827324%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Cosplay_of_Tanjiro_Kamado_from_Demon_Slayer_Kimetsu_no_Yaiba_at_FanimeCon_2023_%2853055828449%29.jpg/960px-Cosplay_of_Tanjiro_Kamado_from_Demon_Slayer_Kimetsu_no_Yaiba_at_FanimeCon_2023_%2853055828449%29.jpg",
	],
	"Nezuko Kamado": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Cosplay_of_Nezuko_Kamado_at_Collector%27s_Hub_Arena_Cosplay_2022.jpg/960px-Cosplay_of_Nezuko_Kamado_at_Collector%27s_Hub_Arena_Cosplay_2022.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Cosplay_of_Nezuko_Kamado_at_Made_in_Asia_2022_%2852111635324%29.jpg/960px-Cosplay_of_Nezuko_Kamado_at_Made_in_Asia_2022_%2852111635324%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Cosplay_of_Nezuko_Kamado_at_Made_in_Asia_2022_%2852155256123%29.jpg/960px-Cosplay_of_Nezuko_Kamado_at_Made_in_Asia_2022_%2852155256123%29.jpg",
	],
	"Izuku Midoriya": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Cosplay_of_Shoto_Todoroki%2C_Izuku_Midoriya_and_Ochaco_Uraraka_from_My_Hero_Academia_at_Otakon_2016_%28IMG_7145%29_%2828887354632%29.jpg/960px-Cosplay_of_Shoto_Todoroki%2C_Izuku_Midoriya_and_Ochaco_Uraraka_from_My_Hero_Academia_at_Otakon_2016_%28IMG_7145%29_%2828887354632%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cosplay_of_Izuku_Midoriya_and_Shoto_Todoroki_from_My_Hero_Academia_at_Necronomi%E2%80%99Con_2022%2C_Andelnans.jpg/960px-Cosplay_of_Izuku_Midoriya_and_Shoto_Todoroki_from_My_Hero_Academia_at_Necronomi%E2%80%99Con_2022%2C_Andelnans.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cosplay_of_Izuku_Midoriya_and_All_Might_from_My_Hero_Academia_at_Made_in_Asia_2022%2C_Day_1_%2852104612141%29.jpg/960px-Cosplay_of_Izuku_Midoriya_and_All_Might_from_My_Hero_Academia_at_Made_in_Asia_2022%2C_Day_1_%2852104612141%29.jpg",
	],
	"Usagi Tsukino": [
		"https://upload.wikimedia.org/wikipedia/commons/c/ce/Usagi_Tsukino_%28cropped%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/2015_C2E2_Cosplay_-_Usagi_Yojimbo_%2817384682242%29.jpg/960px-2015_C2E2_Cosplay_-_Usagi_Yojimbo_%2817384682242%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Sakutsuki_Usagi_as_Rem%2C_Re-Zero_at_CWT55_20200809b.jpg/960px-Sakutsuki_Usagi_as_Rem%2C_Re-Zero_at_CWT55_20200809b.jpg",
	],
	"Rem Betelgeuse": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Cosplayers_of_Ryuk%2C_Misa_Amane_and_Rem_at_Anime_Expo_20110701.jpg/960px-Cosplayers_of_Ryuk%2C_Misa_Amane_and_Rem_at_Anime_Expo_20110701.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cosplay_of_Himiko_Toga_from_My_Hero_Academia_and_Ram_and_Rem_from_Re-Zero_%E2%88%92_Starting_Life_in_Another_World_at_Wuhan_Carnival_%28Service_Desk%29_2019.jpg/960px-Cosplay_of_Himiko_Toga_from_My_Hero_Academia_and_Ram_and_Rem_from_Re-Zero_%E2%88%92_Starting_Life_in_Another_World_at_Wuhan_Carnival_%28Service_Desk%29_2019.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cosplayers_of_You_Watanabe%2C_Yoshiko_Tsushima_and_Rem_20180812.jpg/960px-Cosplayers_of_You_Watanabe%2C_Yoshiko_Tsushima_and_Rem_20180812.jpg",
	],
	"Rukia Kuchiki": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Cosplay_of_Rukia_Kuchiki%2C_with_Kon%2C_Otakon_2012.jpg/960px-Cosplay_of_Rukia_Kuchiki%2C_with_Kon%2C_Otakon_2012.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Cosplay_-_AWA15_-_Rukia_Kuchiki_%283981333111%29.jpg/960px-Cosplay_-_AWA15_-_Rukia_Kuchiki_%283981333111%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Rukia_1_at_Quay_19_in_Port_of_Vene_Balti_Tallinn_29_November_2016.jpg/960px-Rukia_1_at_Quay_19_in_Port_of_Vene_Balti_Tallinn_29_November_2016.jpg",
	],
	"Satoru Gojo": [
		"https://upload.wikimedia.org/wikipedia/commons/4/4c/Satoru_Goj%C5%8D_cosplay.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Suzuki_Baleno%2C_Satoru_Gojo_Jujutsu_Kaisen.jpg/960px-Suzuki_Baleno%2C_Satoru_Gojo_Jujutsu_Kaisen.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Suzuki_Baleno%2C_Satoru_Gojo_Jujutsu_Kaisen_-_2.jpg/960px-Suzuki_Baleno%2C_Satoru_Gojo_Jujutsu_Kaisen_-_2.jpg",
	],
	"Harley Quinn": [
		"https://upload.wikimedia.org/wikipedia/commons/a/a9/Harley-quinn--cosplay-nfcc.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Cosplay_of_Harley_Quinn_at_Brussels_Comic_Con_2022_%2851962444441%29.jpg/960px-Cosplay_of_Harley_Quinn_at_Brussels_Comic_Con_2022_%2851962444441%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cosplay_of_Harley_Quinn_at_Brussels_Comic_Con_2022_%2851962829889%29.jpg/960px-Cosplay_of_Harley_Quinn_at_Brussels_Comic_Con_2022_%2851962829889%29.jpg",
	],
	"Homer Simpson": [
		"https://medias.artmajeur.com/hd/15687763_img-20220426-182732.jpg?v=1738650820",
		"https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyZDU2NDg2cjN4cWx2YXphb3d5ZHdzbHgxcTN6dXRyN3BsdXp2MTB5aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jUwpNzg9IcyrK/giphy.gif",
	],
	"Marge Simpson": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Knit_Marge_Simpson_Cosplay_at_Dragon_Con_2014.jpg/960px-Knit_Marge_Simpson_Cosplay_at_Dragon_Con_2014.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cosplayers_of_Homer_and_Marge%2C_The_Simpsons_at_CWT41_20151212.jpg/960px-Cosplayers_of_Homer_and_Marge%2C_The_Simpsons_at_CWT41_20151212.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/3/38/Marge_Redmond_%28Flying_nun%29_1968_%28cropped%29.JPG",
	],
	"Bugs Bunny": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Love_bugs_%286343851323%29.jpg/960px-Love_bugs_%286343851323%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/American_Red_Cross_-_Miscellaneous_-_American_Red_Cross_workers_disinfecting_barracks_filled_with_refugees_and_%22Typhus_Bugs.%22_Their_costume_is_unique_but_effective_in_preventing_the_typhus_louse_from_reaching_the_body_-_NARA_-_20805756.jpg/960px-thumbnail.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/55/Bugs_Bunny_Walk_of_Fame_4-20-06.jpg",
	],
	"Elsa Arendelle": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Cosplay_of_Anna_and_Elsa_from_Frozen_at_Brussels_Comic_Con_2019_%2847424182182%29.jpg/960px-Cosplay_of_Anna_and_Elsa_from_Frozen_at_Brussels_Comic_Con_2019_%2847424182182%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Cosplay_of_Anna_and_Elsa_from_Frozen_at_Brussels_Comic_Con_2019_%2832364329607%29.jpg/960px-Cosplay_of_Anna_and_Elsa_from_Frozen_at_Brussels_Comic_Con_2019_%2832364329607%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cosplay_of_Anna_and_Elsa_from_Frozen_at_Brussels_Comic_Con_2019_%2840341242263%29.jpg/960px-Cosplay_of_Anna_and_Elsa_from_Frozen_at_Brussels_Comic_Con_2019_%2840341242263%29.jpg",
	],
	"Shrek Ogre": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Comikaze_Expo_2011_-_Fiona_from_Shrek_%286324614641%29.jpg/960px-Comikaze_Expo_2011_-_Fiona_from_Shrek_%286324614641%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Comic-Con_2010_-_Shrek_and_Fiona_costumes_%284878078665%29.jpg/960px-Comic-Con_2010_-_Shrek_and_Fiona_costumes_%284878078665%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Otakuthon_2014-_Akatsuki_Shrek_%2815039589922%29.jpg/960px-Otakuthon_2014-_Akatsuki_Shrek_%2815039589922%29.jpg",
	],
	"Woody Pride": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/D23_Expo_2015_-_Woody_%26_Bo_Peep_%2820607246942%29.jpg/960px-D23_Expo_2015_-_Woody_%26_Bo_Peep_%2820607246942%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/NYCC_2016_-_Woody_%2830215317026%29.jpg/960px-NYCC_2016_-_Woody_%2830215317026%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dragon_Con_2013_-_Woody_%26_Buzz_%289680585982%29.jpg/960px-Dragon_Con_2013_-_Woody_%26_Buzz_%289680585982%29.jpg",
	],
	"Po Ping": [
		"https://upload.wikimedia.org/wikipedia/commons/d/da/Jack.Black.TenaciousD.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/6/66/Jack_Black_%2825747111345%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/a/a9/Jack_Black_%283232290865%29.jpg",
	],
	"Lara Croft": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cosplay_-_AWA15_-_Lara_Croft_%283982143658%29.jpg/960px-Cosplay_-_AWA15_-_Lara_Croft_%283982143658%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cosplay_-_AWA15_-_Lara_Croft_%283982158788%29.jpg/960px-Cosplay_-_AWA15_-_Lara_Croft_%283982158788%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Cosplay_of_Lara_Croft_from_Tomb_Raider_at_Brussels_Comic_Con_2019_%2846391102755%29.jpg/960px-Cosplay_of_Lara_Croft_from_Tomb_Raider_at_Brussels_Comic_Con_2019_%2846391102755%29.jpg",
	],
	"Geralt de Riv": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Cosplay_of_Geralt_of_Rivia_at_the_2021_New_York_Comic_Con_%2851572397237%29.jpg/960px-Cosplay_of_Geralt_of_Rivia_at_the_2021_New_York_Comic_Con_%2851572397237%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Cosplay_of_Geralt_of_Rivia_from_The_Witcher_at_the_2021_New_York_Comic_Con_%28Batch_Edits_-_016%29_%2851574068465%29.jpg/960px-Cosplay_of_Geralt_of_Rivia_from_The_Witcher_at_the_2021_New_York_Comic_Con_%28Batch_Edits_-_016%29_%2851574068465%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Cosplay_of_Geralt_of_Rivia_from_The_Witcher_at_the_2021_New_York_Comic_Con_%28Batch_Edits_-_015%29_%2851574068515%29.jpg/960px-Cosplay_of_Geralt_of_Rivia_from_The_Witcher_at_the_2021_New_York_Comic_Con_%28Batch_Edits_-_015%29_%2851574068515%29.jpg",
	],
	"Aloy Nora": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Aloy_cosplayer_%2837671478344%29.jpg/960px-Aloy_cosplayer_%2837671478344%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Aloy_Cosplayer_at_WonderCon_2017.jpg/960px-Aloy_Cosplayer_at_WonderCon_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/HCCD25_-_Aloy.jpg/960px-HCCD25_-_Aloy.jpg",
	],
	"Kratos Olympe": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/C2E2_2014_-_Kratos_%2814272213315%29.jpg/960px-C2E2_2014_-_Kratos_%2814272213315%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Cosplay_of_Kratos_%28God_of_War%29%2C_New_York_Comic_Con_2017.jpg/960px-Cosplay_of_Kratos_%28God_of_War%29%2C_New_York_Comic_Con_2017.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Kratos_and_Palutena_cosplay_-_New_York_Comic_Con_2022.jpg/960px-Kratos_and_Palutena_cosplay_-_New_York_Comic_Con_2022.jpg",
	],
	"Ellie Williams": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Cosplay_of_Ellie_and_Joel_from_The_Last_of_Us_at_Geek_Kon_2014_%2814909952550%29.jpg/960px-Cosplay_of_Ellie_and_Joel_from_The_Last_of_Us_at_Geek_Kon_2014_%2814909952550%29.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ellie_as_Asuka_standing_at_Expo_Dome_court_yard%2C_iPhone_and_backpack_on_the_ground_20230430b.jpg/960px-Ellie_as_Asuka_standing_at_Expo_Dome_court_yard%2C_iPhone_and_backpack_on_the_ground_20230430b.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Ellie_as_Asuka_standing_at_Expo_Dome_court_yard%2C_iPhone_and_backpack_on_the_ground_20230430c.jpg/960px-Ellie_as_Asuka_standing_at_Expo_Dome_court_yard%2C_iPhone_and_backpack_on_the_ground_20230430c.jpg",
	],
	"Hermione Granger": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Cosplayers_of_Hermione_Granger%2C_Harry_Potter_and_Ron_Weasley_20180519a.jpg/960px-Cosplayers_of_Hermione_Granger%2C_Harry_Potter_and_Ron_Weasley_20180519a.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cosplayers_of_Harry_Potter_and_Hermione_Granger_20181209a.jpg/960px-Cosplayers_of_Harry_Potter_and_Hermione_Granger_20181209a.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Cosplayers_of_Hermione_Granger%2C_Harry_Potter_and_Ron_Weasley_20180519b.jpg/960px-Cosplayers_of_Hermione_Granger%2C_Harry_Potter_and_Ron_Weasley_20180519b.jpg",
	],
	"Elizabeth Bennet": [
		"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Peter_Lely_%281618-1680%29_%28follower_of%29_-_Elizabeth_Bennet_%28d.1696%29%2C_Lady_Carr_-_851765_-_National_Trust.jpg/960px-Peter_Lely_%281618-1680%29_%28follower_of%29_-_Elizabeth_Bennet_%28d.1696%29%2C_Lady_Carr_-_851765_-_National_Trust.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Elizabeth_L._Remba_Gardner%2C_Women%27s_Airforce_Service_Pilots%2C_NARA-542191.jpg/960px-Elizabeth_L._Remba_Gardner%2C_Women%27s_Airforce_Service_Pilots%2C_NARA-542191.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Perth_%28AU%29%2C_Elizabeth_Quay_Bridge_--_2019_--_0375-9.jpg/960px-Perth_%28AU%29%2C_Elizabeth_Quay_Bridge_--_2019_--_0375-9.jpg",
	],
}
